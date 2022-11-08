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
    ScanIndexForward: true,
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

  const tracIdkAndTrackListIds = recommendedTrackQueryResults['Items'].map(
    (i) => ({
      trackId: i.followingTrackId,
      tracklistIds: i.tracklistIds,
    })
  )

  const trackResponses = await Promise.all(
    tracIdkAndTrackListIds.map(async ({ trackId, tracklistIds }) => {
      const trackInfoParams = {
        TableName: TABLE_NAME,
        Key: { HASH: 'Track', RANGE: trackId },
      }
      const trackResult = await dynamo.get(trackInfoParams).promise()
      const t = trackResult['Item']!

      const tracklists = await Promise.all(
        tracklistIds.map(async (tracklistId: string) => {
          const tracklistInfoParams = {
            TableName: TABLE_NAME,
            Key: { HASH: `Tracklist#${tracklistId}`, RANGE: tracklistId },
          }

          const resp = await dynamo.get(tracklistInfoParams).promise()
          const tracklistResult = resp['Item']!

          const r = {
            artist_name: tracklistResult.artistName,
            artwork_url: tracklistResult.artworkUrl,
            date: tracklistResult.date,
            title: tracklistResult.title,
            tracklist_id: tracklistResult.RANGE,
            url: tracklistResult.tracklistUrl,
          }
          return r
        })
      )

      return {
        artist_url: t.artistUrl,
        artwork_url: t.artworkUrl,
        id: t.trackId,
        title: `${t.artistName} - ${t.trackName}`,
        track_url: t.trackUrl,
        track_name: t.trackName,
        artist_name: t.artistName,
        tracklists: tracklists,
      }
    })
  )

  const responseBody = {
    tracks: trackResponses,
  }

  return responseBuilder(200, responseBody)
}
