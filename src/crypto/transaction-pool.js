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
}

module.exports = TransactionPool;
