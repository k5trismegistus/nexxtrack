const tracks = [
  {
    id: '1kyokume',
    trackName: 'Aa mujoh',
    artistName: 'Abe taro',
    trackUrl: '/track/193uwl0f/ovo-untouchable/index.html',
    artistUrl: '/artist/6d09fnd/ovo/index.html',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
  },
  {
    id: '2kyokume',
    trackName: 'AAA ',
    artistName: 'Aso jiro',
    trackUrl: '/track/193uwl0f/ovo-untouchable/index.html',
    artistUrl: '/artist/6d09fnd/ovo/index.html',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
  },
  {
    id: '3kyokume',
    trackName: 'Bem',
    artistName: 'beyan',
    trackUrl: '/track/193uwl0f/ovo-untouchable/index.html',
    artistUrl: '/artist/6d09fnd/ovo/index.html',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
  },
  {
    id: '4kyokume',
    trackName: 'cat daisuki',
    artistName: 'cathrine',
    trackUrl: '/track/193uwl0f/ovo-untouchable/index.html',
    artistUrl: '/artist/6d09fnd/ovo/index.html',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
  },
]

const recommends = [
  {
    trackId: '1kyokume',
    recommendedTrackId: '2kyokume',
    score: 120,
    tracklistIds: ['1list2'],
  },
  {
    trackId: '1kyokume',
    recommendedTrackId: '3kyokume',
    score: 130,
    tracklistIds: ['1list3'],
  },
  {
    trackId: '1kyokume',
    recommendedTrackId: '4kyokume',
    score: 140,
    tracklistIds: ['1list4'],
  },
  {
    trackId: '2kyokume',
    recommendedTrackId: '1kyokume',
    score: 210,
    tracklistIds: ['2list1'],
  },
  {
    trackId: '2kyokume',
    recommendedTrackId: '3kyokume',
    score: 230,
    tracklistIds: ['2list3'],
  },
  {
    trackId: '2kyokume',
    recommendedTrackId: '4kyokume',
    score: 240,
    tracklistIds: ['2list4'],
  },
  {
    trackId: '3kyokume',
    recommendedTrackId: '1kyokume',
    score: 310,
    tracklistIds: ['3list1'],
  },
  {
    trackId: '3kyokume',
    recommendedTrackId: '2kyokume',
    score: 320,
    tracklistIds: ['3list2'],
  },
  {
    trackId: '3kyokume',
    recommendedTrackId: '4kyokume',
    score: 340,
    tracklistIds: ['3list4'],
  },
  {
    trackId: '4kyokume',
    recommendedTrackId: '1kyokume',
    score: 410,
    tracklistIds: ['4list1'],
  },
  {
    trackId: '4kyokume',
    recommendedTrackId: '2kyokume',
    score: 420,
    tracklistIds: ['4list2'],
  },
  {
    trackId: '4kyokume',
    recommendedTrackId: '3kyokume',
    score: 430,
    tracklistIds: ['4list3'],
  },
]

const tracklists = [
  {
    tracklistId: '1list2',
    trackIds: ['1kyokume', '2kyokume'],
    date: '2019-01-02',
    title: '12land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 120,
  },
  {
    tracklistId: '1list3',
    trackIds: ['1kyokume', '3kyokume'],
    date: '2019-01-03',
    title: '13land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 130,
  },
  {
    tracklistId: '1list4',
    trackIds: ['1kyokume', '4kyokume'],
    date: '2019-01-04',
    title: '14land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 140,
  },
  {
    tracklistId: '2list1',
    trackIds: ['2kyokume', '1kyokume'],
    date: '2019-02-01',
    title: '21land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 210,
  },
  {
    tracklistId: '2list3',
    trackIds: ['2kyokume', '3kyokume'],
    date: '2019-02-03',
    title: '23land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 230,
  },
  {
    tracklistId: '2list4',
    trackIds: ['2kyokume', '4kyokume'],
    date: '2019-02-04',
    title: '24land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 240,
  },
  {
    tracklistId: '3list1',
    trackIds: ['3kyokume', '1kyokume'],
    date: '2019-03-01',
    title: '31land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 310,
  },
  {
    tracklistId: '3list2',
    trackIds: ['3kyokume', '2kyokume'],
    date: '2019-03-02',
    title: '32land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 320,
  },
  {
    tracklistId: '3list4',
    trackIds: ['3kyokume', '4kyokume'],
    date: '2019-03-04',
    title: '34land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 340,
  },
  {
    tracklistId: '4list1',
    trackIds: ['4kyokume', '1kyokume'],
    date: '2019-04-01',
    title: '41land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 410,
  },
  {
    tracklistId: '4list2',
    trackIds: ['4kyokume', '2kyokume'],
    date: '2019-04-02',
    title: '42land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 420,
  },
  {
    tracklistId: '4list3',
    trackIds: ['4kyokume', '3kyokume'],
    date: '2019-04-03',
    title: '43land',
    artworkUrl:
      'https://geo-media.beatport.com/image_size/300x300/aa4c9c83-d7fe-4af4-9783-20e786343ed2.jpg',
    tracklistUrl:
      'https://www.1001tracklists.com/tracklist/1byh1bsk/dash-berlin-main-stage-ultra-music-festival-brazil-2016-10-15.html',
    viewcount: 430,
  },
]

import AWS from 'aws-sdk'
const DynamoDB = AWS.DynamoDB
import { normalizeSync } from 'normalize-diacritics'

const TABLE_NAME = process.env.NEXXTRACK_TABLE

const sortKey = (rawKey) => {
  const normalized = normalizeSync(rawKey)
  return normalized.toLowerCase()
}

const dynamo = new DynamoDB({ region: process.env.AWS_DEFAULT_REGION })

tracks.forEach((track) => {
  dynamo.putItem(
    {
      TableName: TABLE_NAME,
      Item: {
        HASH: { S: 'Track' },
        RANGE: { S: track.id },
        primaryString: { S: sortKey(track.trackName) },
        secondaryString: { S: sortKey(track.artistName) },
        primaryNumber: { N: '0' },
        trackId: { S: track.id },
        trackName: { S: track.trackName },
        artistName: { S: track.artistName },
        trackUrl: { S: track.trackUrl },
        artistUrl: { S: track.artistUrl },
        artworkUrl: { S: track.artworkUrl },
      },
    },
    (err, data) => {
      if (err) {
        console.error(err)
      }
    }
  )
})

recommends.forEach((recommend) => {
  dynamo.putItem(
    {
      TableName: TABLE_NAME,
      Item: {
        HASH: { S: `Recommend#${recommend.trackId}` },
        RANGE: { S: recommend.recommendedTrackId },
        primaryString: { S: recommend.trackId },
        secondaryString: { S: recommend.recommendedTrackId },
        primaryNumber: { N: `${recommend.score}` },
        trackId: { S: recommend.trackId },
        recommendedTrackId: { S: recommend.recommendedTrackId },
        score: { N: `${recommend.score}` },
        tracklistIds: {
          L: recommend.tracklistIds.map((id) => {
            return {
              S: id,
            }
          }),
        },
      },
    },
    (err, data) => {
      if (err) {
        console.error(err)
      }
    }
  )
})

tracklists.forEach((tracklist) => {
  dynamo.putItem(
    {
      TableName: TABLE_NAME,
      Item: {
        HASH: { S: `Tracklist` },
        RANGE: { S: tracklist.tracklistId },
        primaryString: { S: tracklist.title },
        secondaryString: { S: tracklist.date },
        primaryNumber: { N: '0' },
        date: { S: tracklist.date },
        title: { S: tracklist.title },
        trackIds: {
          L: tracklist.trackIds.map((id) => {
            return {
              S: id,
            }
          }),
        },
        artworkUrl: { S: tracklist.artworkUrl },
        tracklistUrl: { S: tracklist.tracklistUrl },
        viewcount: { N: `${tracklist.viewcount}` },
      },
    },
    (err, data) => {
      if (err) {
        console.error(err)
      }
    }
  )
})
