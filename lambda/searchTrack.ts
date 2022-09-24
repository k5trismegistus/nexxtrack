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
    return responseBuilder(400, {}, 'Query term is blank')
  }
  const term = event['queryStringParameters']['q'] || ''

  const dynamo = new DynamoDB.DocumentClient()

  const trackQueryParams = {
    TableName: process.env.TABLE_NAME,
    IndexName: 'primaryNameLsi',
    KeyConditionExpression: '#pk = :track_pk and begins_with(#sk, :q)',
    ExpressionAttributeNames: {
      '#pk': 'HASH',
      '#sk': 'primaryString',
    },
    ExpressionAttributeValues: {
      ':track_pk': 'Track',
      ':q': term,
    },
    Limit: 5,
  }
  const trackQueryResults = await dynamo.query(trackQueryParams).promise()
  const tracksByTitle =
    trackQueryResults && trackQueryResults.Items ? trackQueryResults.Items : []

  const artistQueryParams = {
    TableName: process.env.TABLE_NAME,
    IndexName: 'secondaryNameLsi',
    KeyConditionExpression: '#pk = :track_pk and begins_with(#sk, :q)',
    ExpressionAttributeNames: {
      '#pk': 'HASH',
      '#sk': 'secondaryString',
    },
    ExpressionAttributeValues: {
      ':track_pk': 'Track',
      ':q': term,
    },
    Limit: 5,
  }
  const artistQueryResults = await dynamo.query(artistQueryParams).promise()
  const tracksByArtist =
    artistQueryResults && artistQueryResults.Items
      ? artistQueryResults.Items
      : []

  const tracks = [...tracksByTitle, ...tracksByArtist].map((t) => ({
    artist_url: t.artistUrl,
    artwork_url: t.artworkUrl,
    id: t.trackId,
    title: `${t.artistName} - ${t.trackName}`,
    track_url: t.trackUrl,
    track_name: t.trackName,
    artist_name: t.artistName,
  }))

  return responseBuilder(200, { tracks })
}
