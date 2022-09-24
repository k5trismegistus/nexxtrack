import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'
import { responseBuilder } from './responseBuilder'

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: APIGatewayEventRequestContextV2
): Promise<APIGatewayProxyResultV2> => {
  if (!process.env.TABLE_NAME) {
    return responseBuilder(500, {}, 'Dynamo table is not found')
  }
  const TABLE_NAME = process.env.TABLE_NAME

  if (!event['queryStringParameters']) {
    return responseBuilder(400, {}, 'TrackId is blank')
  }
  const trackId = event['queryStringParameters']['track_id'] || ''

  const dynamo = new DynamoDB.DocumentClient()

  const recommendedTrackQueryParams = {
    TableName: TABLE_NAME,
    IndexName: 'primaryNumberLsi',
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: {
      '#pk': 'HASH',
    },
    ExpressionAttributeValues: {
      ':pk': `Recommend#${trackId}`,
    },
    ScanIndexForward: false,
    Limit: 5,
  }
  const recommendedTrackQueryResults = await dynamo
    .query(recommendedTrackQueryParams)
    .promise()

  if (!recommendedTrackQueryResults['Items']) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error' }),
    }
  }

  const recommendedTrackIds = recommendedTrackQueryResults['Items'].map(
    (i) => i.recommendedTrackId
  )

  const trackResponses = await Promise.all(
    recommendedTrackIds.map(async (id) => {
      const params = {
        TableName: TABLE_NAME,
        Key: { HASH: 'Track', RANGE: id },
      }
      const result = await dynamo.get(params).promise()
      const t = result['Item']!

      return {
        artist_url: t.artistUrl,
        artwork_url: t.artworkUrl,
        id: t.trackId,
        title: `${t.artistName} - ${t.trackName}`,
        track_url: t.trackUrl,
        track_name: t.trackName,
        artist_name: t.artistName,
      }
    })
  )

  const responseBody = {
    tracks: trackResponses,
  }

  return responseBuilder(200, responseBody)
}
