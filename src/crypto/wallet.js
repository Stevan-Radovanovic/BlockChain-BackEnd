const { INITIAL_BALANCE } = require('../../config');
const { keyPair } = require('./elliptic');
const { ec } = require('./elliptic');
const cryptoHash = require('../blockchain/crypto-hash');
class Wallet {
  constructor({ publicKey }) {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    const newData = cryptoHash(data);
    return this.keyPair.sign(newData);
  }
}

module.exports = Wallet;
