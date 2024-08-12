const express = require('express');
const app = express();
const port = 3000;

var cors = require('cors');
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World! 222');
});

app.use('/test', require('./test'));
app.use('/postgres', require('./postgres'));
app.use('/mongo', require('./mongo'));
app.use('/redis', require('./redis'));
app.use('/elasticsearch', require('./elasticsearch'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});