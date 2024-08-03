
const express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
  res.send('redis: 111');
});


router.get('/check', async (req, res) => {
  const status = await checkClient();
  res.send('check: ' + status);
});



const { createClient } = require('redis');

const client = createClient({
  url: 'redis://localhost:6379'
});
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

const checkClient = async () => {

  await client.set('status', 'Redis Connected 333');
  const value = await client.get('status');
  return value;
};
