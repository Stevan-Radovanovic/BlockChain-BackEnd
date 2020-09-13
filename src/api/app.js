const express = require('express');
const Blockchain = require('../blockchain/blockchain');

const app = express();
const blockchain = new Blockchain();

app.get('/blocks', (req, res) => {
  res.status(200).json({ chain: blockchain.chain });
});

console.log('BlockChain API starting');
app.listen(3000);
