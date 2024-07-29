
const express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
  res.send('testRouter: 111');
});


// todos

router.get('/query', function (req, res) {
  // test/query?key1=value1&key2=value2
  const { key, key2 } = req.query;

  res.send(`testRouter - key:${key} key2:${key2}`);
});
