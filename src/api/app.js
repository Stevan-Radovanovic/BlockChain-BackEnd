const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain/blockchain');
const PubSub = require('./pubsub');

const app = express();
const blockchain = new Blockchain();
const pubSub = new PubSub({ blockchain });

setTimeout(() => pubSub.broadcastChain(), 1000);

app.use(bodyParser.json());

app.get('/blocks', (req, res, next) => {
  res.status(200).json({ chain: blockchain.chain });
});

app.post('/blocks/return', (req, res, next) => {
  blockchain.addBlock({ data: req.body.data });
  pubSub.broadcastChain();
  res.status(201).json({ message: 'Block added', data: req.body.data });
});

app.post('/blocks/redirect', (req, res, next) => {
  const block = blockchain.addBlock({ data: req.body.data });
  pubSub.broadcastChain();
  res.redirect('/blocks');
});

const DEFAULT_PORT = 3000;
let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT | DEFAULT_PORT;

console.log('BlockChain API starting');
app.listen(PORT);
