var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index_med_css_och_databas', { title: 'Express' });
});


module.exports = router;
