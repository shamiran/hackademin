var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('chinook.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
});

router.get('/', function (req, res, next) {
  db.serialize((albums) => {
    db.all('SELECT *  FROM Album;', (err, rows) => {
      if (err) {
        console.error(err.message)
      } else {
        console.log("Rows: ", rows)
        let albums = []
        rows.forEach((row) => {
          albums.push(row.Title)
        });
        res.render('albums', {
          title: 'Express',
          albums: albums
        });
        console.log("Albums: ", albums)
      }
    })
  });

});

module.exports = router;
