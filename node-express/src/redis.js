
const express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
  res.send('redis: 111');
});


router.get('/test', async (req, res) => {
  const status = await checkClient();
  res.send('check: ' + status);
});



const { createClient } = require('redis');


const hostName = process.env.REDIS_HOST || 'localhost';
const hostPort = process.env.REDIS_PORT || '6379';


const client = createClient({
  url: `redis://${hostName}:${hostPort}`
});
client.on('error', err => {
  console.error('RedisError: Failed to connect');
  // console.error(err);
  client.disconnect();
});
client.connect();


const checkClient = async () => {
  await client.set('status', 'Redis Connected 333');
  const value = await client.get('status');
  return value;
};
