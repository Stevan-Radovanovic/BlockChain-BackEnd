const { INITIAL_BALANCE } = require('../../config');

class Wallet {
  constructor({ publicKey }) {
    this.balance = INITIAL_BALANCE;
    this.publicKey = publicKey;
  }
}

module.exports = Wallet;
