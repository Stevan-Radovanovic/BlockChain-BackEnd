const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain/blockchain');
const PubSub = require('./pubsub');

const app = express();
const blockchain = new Blockchain();
const pubSub = new PubSub({ blockchain });

app.use(bodyParser.json());

app.get('/blocks', (req, res, next) => {
  res.status(200).json({ chain: blockchain.chain });
});

app.post('/blocks/return', (req, res, next) => {
  blockchain.addBlock({ data: req.body.data });
  res.status(201).json({ message: 'Block added', data: req.body.data });
});

app.post('/blocks/redirect', (req, res, next) => {
  const block = blockchain.addBlock({ data: req.body.data });
  res.redirect('/blocks');
});

console.log('BlockChain API starting');
app.listen(3000);
