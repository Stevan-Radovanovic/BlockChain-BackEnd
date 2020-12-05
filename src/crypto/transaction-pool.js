const Transaction = require('./transaction');

class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }

  findTransaction({ inputAdress }) {
    const transactions = Object.values(this.transactionMap);
    return transactions.find((trans) => trans.input.adress === inputAdress);
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
