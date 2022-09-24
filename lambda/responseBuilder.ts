import { APIGatewayProxyResultV2 } from 'aws-lambda'

export const responseBuilder = (
  status: number,
  body: Object,
  error?: String
): APIGatewayProxyResultV2 => {
  const responseBody = error ? { error } : body
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(responseBody),
  }
}
