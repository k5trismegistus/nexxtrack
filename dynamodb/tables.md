| Type      | HASH (pk)              | RANGE (sk)         | primaryString        | secondaryString       | primaryNumber | attributes                                                      |
| --------- | ---------------------- | ------------------ | -------------------- | --------------------- | ------------- | --------------------------------------------------------------- |
| Track     | "Track"                | trackId            | normalize(trackName) | normalize(artistName) | N/A           | trackId, trackName, artistName, trackUrl, artistUrl, artworkUrl |
| Recommend | `Recommend#${trackId}` | recommendedTrackId | N/A                  | N/A                   | score,        | trackId, followingTrackId, score, tracklists                    |
| Tracklist | "Tracklist"            | tracklistId        | N/A                  | N/A                   | N/A           | trackListId, date, title, artworkUrl, trackListUrl, viewcount   |
