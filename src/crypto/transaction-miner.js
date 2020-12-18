const Transaction = require('./transaction');

class TransactionMiner {
  constructor({ transactionPool, blockchain, pubSub, wallet }) {
    this.transactionPool = transactionPool;
    this.blockchain = blockchain;
    this.pubSub = pubSub;
    this.wallet = wallet;
  }

  mineTransactions() {
    const validTransactions = this.transactionPool.validTransactions();
    if (validTransactions.length === 0) return;
    const rewardTransaction = Transaction.createRewardTransaction({
      minerWallet: this.wallet,
    });
    validTransactions.push(rewardTransaction);

    this.blockchain.addBlock({ data: validTransactions });
    this.pubSub.broadcastChain();
    this.transactionPool.clear();
  }
}

module.exports = TransactionMiner;
