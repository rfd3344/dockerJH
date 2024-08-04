
const express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
  res.send('mongo: 111');
});


router.get('/test', async (req, res) => {
  const status = await checkClient();
  res.send(status);
});


const { MongoClient } = require('mongodb');


const hostName = process.env.REDIS_HOST || 'localhost';
const hostPort = process.env.REDIS_PORT || '6379';



console.warn('hostName', hostName, hostPort);
const client = new MongoClient(`mongodb://${hostName}:${hostPort}`);

const checkClient = async () => {

  const resp = await client.connect()
    .catch(err => console.error('ConnectError:', err))
    .finally(() => client.close());


  return resp;

};