const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Blockchain = require('../blockchain/blockchain');
const PubSub = require('./pubsub');
const TransactionPool = require('../crypto/transaction-pool');
const Wallet = require('../crypto/wallet');

const app = express();
const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();
const pubSub = new PubSub({ blockchain });

const DEFAULT_PORT = 3000;
const ROOT_ROUTE = `http://localhost:${DEFAULT_PORT}`;

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

app.post('/transact/create', (req, res, next) => {
  const { amount, recipient } = req.body;
  let transaction = transactionPool.findTransaction({
    inputAdress: wallet.publicKey,
  });
  try {
    if (transaction) {
      transaction.update({ senderWallet: wallet, amount, recipient });
    } else {
      transaction = wallet.createTransaction({ amount, recipient });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Crypton Error', message: error.message });
  }

  transactionPool.setTransaction(transaction);

  res
    .status(201)
    .json({ message: 'Transaction created', transaction: transaction });
});

app.get('/transact/pool', (req, res) => {
  res.status(200).json({ transactionPoolMap: transactionPool.transactionMap });
});

const syncChains = () => {
  console.log('Sync Chains fired up.');
  request({ url: `${ROOT_ROUTE}/blocks` }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return;
    }
    const rootChain = JSON.parse(body);
    blockchain.replaceChain(rootChain.chain);
  });
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT | DEFAULT_PORT;

console.log('BlockChain API starting');

app.listen(PORT, () => {
  console.log(`Starting @ PORT ${PORT}`);
  if (PORT !== DEFAULT_PORT) {
    syncChains();
  }
});
