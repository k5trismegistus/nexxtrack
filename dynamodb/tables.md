| Type      | pk                     | sk                 | primaryString | secondaryString | primaryNumber | attributes                                                      |
| --------- | ---------------------- | ------------------ | ------------- | --------------- | ------------- | --------------------------------------------------------------- |
| Track     | "Track"                | trackId            | trackName     | artistName      | N/A           | trackId, trackName, artistName, trackUrl, artistUrl, artworkUrl |
| Recommend | `Recommend#${trackId}` | recommendedTrackId | N/A           | N/A             | score,        | trackId, followingTrackId, score, tracklists                    |
| TrackList | "TrackList"            | djsetId            | N/A           | N/A             | N/A           | trackListId, date, title, artworkUrl, trackListUrl, viewcount   |
