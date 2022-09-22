import AWS from 'aws-sdk'
AWS.config.update({ region: 'ap-northeast-1' })
const DynamoDB = AWS.DynamoDB.DocumentClient

const TABLE_NAME = process.env.NEXXTRACK_TABLE

const documentClient = new AWS.DynamoDB.DocumentClient()

const params1 = {
  TableName: TABLE_NAME,
  IndexName: 'primaryNameLsi',
  KeyConditionExpression: '#pk = :track_pk and begins_with(#sk, :q)',
  ExpressionAttributeNames: {
    '#pk': 'HASH',
    '#sk': 'primaryString',
  },
  ExpressionAttributeValues: {
    ':track_pk': 'Track',
    ':q': 'aa',
  },
}

// documentClient.query(params1, (err, data) => {
//   if (err) console.log(err)
//   else console.log(data)
// })

const params2 = {
  TableName: TABLE_NAME,
  IndexName: 'secondaryNameLsi',
  KeyConditionExpression: '#pk = :track_pk and begins_with(#sk, :q)',
  ExpressionAttributeNames: {
    '#pk': 'HASH',
    '#sk': 'secondaryString',
  },
  ExpressionAttributeValues: {
    ':track_pk': 'Track',
    ':q': 'aso',
  },
}

documentClient.query(params2, (err, data) => {
  if (err) console.log(err)
  else console.log(data)
})
