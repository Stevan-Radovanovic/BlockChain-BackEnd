const Transaction = require('./transaction');

class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  clear() {
    this.transactionMap = {};
  }

  clearBlockchainTransactions({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];

      for (let transaction of block.data) {
        if (this.transactionMap[transaction.id]) {
          delete this.transactionMap[transaction.id];
        }
      }
    }
  }

  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }

  findTransaction({ inputAddress }) {
    const transactions = Object.values(this.transactionMap);

    return transactions.find((trans) => trans.input.address === inputAddress);
  }

  replacePoolMap(transactionMap) {
    this.transactionMap = transactionMap;
  }

  validTransactions() {
    const transactions = Object.values(this.transactionMap);
    return transactions.filter((trans) => Transaction.verifyTransaction(trans));
  }
}

module.exports = TransactionPool;
