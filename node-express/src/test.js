
const express = require('express');
var router = express.Router();

// todos


router.get('/', function (req, res) {
  res.send('testRouter: 111');
});



router.get('/query', function (req, res) {
  // test/query?key1=value1&key2=value2
  const { key1, key2 } = req.query;

  res.send(`testRouter- key1:${key1} key2:${key2}`);
});

module.exports = router;