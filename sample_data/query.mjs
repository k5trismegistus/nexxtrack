import AWS from 'aws-sdk'
AWS.config.update({ region: 'us-east-1' })
const DynamoDB = AWS.DynamoDB.DocumentClient

const TABLE_NAME = process.env.NEXXTRACK_TABLE

const documentClient = new AWS.DynamoDB.DocumentClient()

const trackId = 'sfjzs0f'
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

const to = async () => {
  const data = await documentClient.query(recommendedTrackQueryParams).promise()
  const tracIdkAndTrackListIds = data['Items'].map((i) => ({
    trackId: i.followingTrackId,
    tracklistIds: i.tracklistIds,
  }))
  const trackResponses = await Promise.all(
    tracIdkAndTrackListIds.map(async ({ trackId, tracklistIds }) => {
      const trackInfoParams = {
        TableName: TABLE_NAME,
        Key: { HASH: 'Track', RANGE: trackId },
      }
      const trackResult = await documentClient.get(trackInfoParams).promise()
      const t = trackResult['Item']

      const tracklists = await Promise.all(
        tracklistIds.map(async (tracklistId) => {
          const tracklistInfoParams = {
            TableName: TABLE_NAME,
            Key: { HASH: `Tracklist#${tracklistId}`, RANGE: tracklistId },
          }

          const resp = await documentClient.get(tracklistInfoParams).promise()
          const tracklistResult = resp['Item']

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

  console.log(responseBody)
}

to().then()
