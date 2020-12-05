class TransactionMiner {
  constructor({ transactionPool, blockchain, pubsub, wallet }) {
    this.transactionPool = transactionPool;
    this.blockchain = blockchain;
    this.pubsub = pubsub;
    this.wallet = wallet;
  }

  mineTransactions() {}
}

module.exports = TransactionMiner;
