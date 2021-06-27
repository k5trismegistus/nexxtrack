import os
import sqlite3
from flask import Flask, request, jsonify, g
from flask_cors import CORS


app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app, origins=[
    'http://lvh.me:1234',
    'https://nexxtrack.club'
])

@app.route('/')
def index():
    return { 'message': 'hello world' }

@app.route('/tracks')
def search():
    search = request.args.get('q')
    sql = 'SELECT id, title, track_url, artist_url, artwork_url FROM tracks WHERE title LIKE ? LIMIT 11'

    raw_tracks = g.cursor.execute(sql, (f'%{search}%', )).fetchall()

    more = True if len(raw_tracks) > 0 else False
    limit = min(10, len(raw_tracks))

    tracks = [{
        'id': r[0],
        'title': r[1],
        'track_url': f"https://www.1001tracklists.com{r[2]}",
        'artist_url': f"https://www.1001tracklists.com{r[3]}",
        'artwork_url': r[4],
    } for r in raw_tracks[0:limit]]


    return jsonify({
        'tracks': tracks,
        'more': more,
    })

@app.route('/recommends')
def recommend():
    track_id = request.args.get('track_id')
    offset = request.args.get('o') # Offset is not implemented

    sql_recommended = ' \
        SELECT \
            tracks.id, title, track_url, artist_url, artwork_url \
        FROM \
            tracks, recommends \
        WHERE \
            tracks.id = recommends.following_track_id AND \
            recommends.track_id = ? \
        ORDER BY \
            recommends.score DESC\
        LIMIT 4'
    raw_recommended = g.cursor.execute(sql_recommended, (track_id, )).fetchall()
    more_track = True if len(raw_recommended) > 3 else False
    track_limit = min(len(raw_recommended), 3)
    recommended_tracks = [{
        'id': r[0],
        'title': r[1],
        'track_url': f"https://www.1001tracklists.com{r[2]}",
        'artist_url': f"https://www.1001tracklists.com{r[3]}",
        'artwork_url': r[4],
    } for r in raw_recommended[0:track_limit]]

    for recommended_track in recommended_tracks:
        sql_tracklist = f" \
            SELECT DISTINCT \
                tracklist_id, date, title, artwork_url, url, viewcount \
            FROM \
                tracklists, track_followings \
            WHERE \
                track_followings.tracklist_id = tracklists.id AND \
                track_followings.track_id = ? AND \
                track_followings.following_track_id = ? \
            ORDER BY \
                viewcount DESC\
            LIMIT 4"
        raw_tracklist = g.cursor.execute(sql_tracklist, (track_id, recommended_track['id'])).fetchall()

        tracklist_more = True if len(raw_tracklist) > 3 else False
        tracklist_limit = min(len(raw_tracklist), 3)

        tracklists = [{
            'tracklist_id': r[0],
            'date': r[1],
            'title': r[2],
            'artwork_url': r[3],
            'url': r[4],
            'viewcount': r[5]
        } for r in raw_tracklist[0:tracklist_limit]]

        recommended_track['tracklists'] = tracklists

    return jsonify({ 'tracks': recommended_tracks })


def before_request():
    db_file = os.getenv('DB_FILE')
    g.db = sqlite3.connect(db_file)
    g.cursor = g.db.cursor()

app.before_request(before_request)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)