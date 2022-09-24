import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: APIGatewayEventRequestContextV2
): Promise<APIGatewayProxyResultV2> => {
  if (!process.env.TABLE_NAME) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Dynamo table is not found' }),
    }
  }
  if (!event['queryStringParameters']) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Query term is blank' }),
    }
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

  const responseBody = {
    tracks: [...tracksByTitle, ...tracksByArtist],
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(responseBody),
  }
}
