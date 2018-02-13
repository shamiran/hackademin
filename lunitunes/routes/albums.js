var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('chinook.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
});

router.get('/', function (req, res, next) {
  db.serialize( () => {
    let sqlStatement = 'SELECT Title, Artist.Name AS ArtistName, Artist.ArtistId AS ArtistId, Album.AlbumId AS AlbumId FROM Album LEFT OUTER JOIN Artist ON Album.ArtistId = Artist.ArtistId;'
    db.all(sqlStatement, (err, rows) => {
      if (err) {
        console.error(err.message)
      } else {
        console.log("Rows: ", rows)
        let albums = []
        rows.forEach((row) => {
          albums.push({
            title: row.Title,
            artistName: row.ArtistName,
            albumId: row.AlbumId,
            artistId: row.ArtistId
            })
        });
        res.render('albums', {
          title: 'Lunitunes Albums',
          albums: albums
        });
        console.log("Albums: ", albums)
      }
    })
  });

});

router.get('/:albumId', function (req, res, next) {
  let albumId = req.params.albumId;
  db.serialize( () => {
    console.log("Hello")
    let sql = ('SELECT Track.Name AS TrackName, Album.Title AS AlbumName, Track.UnitPrice AS UnitPrice, Artist.Name AS ArtistName  FROM Track LEFT OUTER JOIN Album ON Track.AlbumId = Album.AlbumId LEFT OUTER JOIN ARTIST ON Album.ArtistId = Artist.ArtistId WHERE Track.AlbumId = ?;')
    db.all(sql, albumId, (err, rows) => {
      if (err) {
        return res.status(500);
      } else {
        console.log("Boom")
        let albumTitle = rows[0].AlbumName
        let tracks = []
        rows.forEach( (row) => {
          tracks.push({
            name: row.TrackName,
            albumName:  row.AlbumName,
            artistName: row.ArtistName,
            price: row.UnitPrice
          })
        })
        res.render('album', {
          title: albumTitle,
          tracks: tracks
        })
      }
    })
  })
});

module.exports = router;
