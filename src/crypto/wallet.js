const { INITIAL_BALANCE } = require('../../config');
const { keyPair } = require('./elliptic');
const { ec } = require('./elliptic');
const cryptoHash = require('../blockchain/crypto-hash');
const Transaction = require('./transaction');
class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    const newData = cryptoHash(data);
    return this.keyPair.sign(newData);
  }

  createTransaction({ recipient, amount }) {
    if (amount > this.balance) {
      console.error('Transaction Error: Amount exceeds current balance');
      throw new Error('Amount exceeds the current balance');
    }
    return new Transaction({ senderWallet: this, recipient, amount });
  }
}

module.exports = Wallet;
