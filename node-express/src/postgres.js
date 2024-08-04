
const express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
  res.send('postgres: 111');
});


router.get('/test', async (req, res) => {
  const status = await checkClient();
  res.send(status);
});


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: process.env.POSTGRESS_HOST || 'localhost',
  port: process.env.POSTGRESS_PORT || '5432',
  dialect: 'postgres',
  database: 'postgres',
  username: 'postgres',
  password: 'postgres',
});

const checkClient = async () => {
  try {
    const resp = await sequelize.authenticate();
    console.log('ConnectSuccess', resp);
    return 'ConnectSuccess';
  } catch (error) {
    console.error('ConnectError:', error);
  }
};