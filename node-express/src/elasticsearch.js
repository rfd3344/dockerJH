
const express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {

  res.send('elasticsearch: 222');
});

router.get('/test', async (req, res) => {
  const resp = await checkConnection();

  res.send(resp);
});

router.get('/index', async (req, res) => {


  const indexName = 'sample_index';
  createIndex(indexName);

  const documents = [
    { title: 'Elasticsearch Basics', content: 'Introduction to Elasticsearch', date: '2021-01-01' },
    { title: 'Advanced Elasticsearch', content: 'Deep dive into Elasticsearch', date: '2021-01-02' },
    { title: 'Advanced Elasticsearch4', content: 'Deep dive into Elasticsearch2', date: '2021-01-02' },
    { title: 'Advanced Elasticsearch3', content: 'Deep dive into Elasticsearch', date: '2021-01-02' },
  ];

  const respIndex = await indexDocuments(indexName, documents);

  res.send(respIndex);
});



router.get('/search', async (req, res) => {

  const indexName = 'sample_index';

  const query = {
    query: {
      match: {
        title: 'Elasticsearch'
      }
    }
  };

  const searchResp = await searchDocuments(indexName, query);

  res.send(searchResp);
});




const { Client } = require('@elastic/elasticsearch');
const fs = require('node:fs');
// const client = new Client({ node: 'http://localhost:9200' });


const client = new Client({
  node: 'https://localhost:9200',
  // cloud: {
  //   id: 'http://localhost:9200'
  // },
  auth: {
    username: 'elastic',
    password: 'D4=K4L7DLi*lwGBT4gtI'
  },
  tls: {
    ca: fs.readFileSync('./http_ca.crt'),
    rejectUnauthorized: false
  }
});

// const client = new Client({
//   node: 'https://test.es.ap-southeast-2.aws.found.io',
//   cloud: {
//     id: 'test:YXAtc291dGhlYXN0LTIuYXdzLmZvdW5kLmlvOjQ0MyRkMDdmNDgwOTkxYWE0ZDA2ODJhMTY2ZDFhYTMwYTMxOSQzMGU5MTFiMDA2YTQ0MTUwODI0NmUwN2M2ZTVjNzkzNA=='
//   },
//   auth: {
//     username: 'elastic',
//     password: '9RWbfv78tXxycMVNXm5psllm'
//   }
// });

async function checkConnection() {
  try {
    const health = await client.cluster.health({});
    console.log('Elasticsearch cluster health:', health);
    return health;
  } catch (error) {
    console.error('Elasticsearch connection error:', error);
    return '';
  }
}

async function createIndex(indexName) {
  try {
    const exists = await client.indices.exists({ index: indexName });
    if (!exists.body) {
      await client.indices.create({
        index: indexName,
        body: {
          settings: {
            number_of_shards: 1,
            number_of_replicas: 0
          },
          mappings: {
            properties: {
              title: { type: 'text' },
              content: { type: 'text' },
              date: { type: 'date' }
            }
          }
        }
      });
      console.log(`Index '${indexName}' created`);
    } else {
      console.log(`Index '${indexName}' already exists`);
    }
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

async function indexDocuments(indexName, documents) {
  try {
    let resp = [];
    for (const [i, doc] of documents.entries()) {
      const res = await client.index({
        index: indexName,
        id: i + 1,
        body: doc
      });
      resp.push(res);
    }
    console.log('Documents indexed');
    return resp;
  } catch (error) {
    console.error('Error indexing documents:', error);
  }
}

async function searchDocuments(indexName, query) {
  try {
    const response = await client.search({
      index: indexName,
      body: query
    });

    console.log('LOG-searchDocuments:', response);

    const respSources = response.hits.hits.map(item => item._source);
    return respSources || [];
    // response.hits.hits.forEach(hit => {
    //   console.log(hit?._source);
    // });
  } catch (error) {
    console.error('Error searching documents:', error);
  }
}
