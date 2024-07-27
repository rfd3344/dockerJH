
const express = require('express');
var router = express.Router();



// todos:





router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;