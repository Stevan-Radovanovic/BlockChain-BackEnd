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

  createTransaction({ recipient, amount, chain }) {
    if (chain) {
      this.balance = Wallet.calculateBalance({
        chain,
        address: this.publicKey,
      });
    }

    if (amount > this.balance) {
      console.error('Transaction Error: Amount exceeds current balance');
      throw new Error('Amount exceeds the current balance');
    }
    return new Transaction({ senderWallet: this, recipient, amount });
  }

  static calculateBalance({ chain, address }) {
    let hasConductedTransaction = false;
    let outputsTotal = 0;

    for (let i = chain.length - 1; i > 0; i--) {
      const block = chain[i];

      for (let transaction of block.data) {
        console.log(transaction.input.address);
        console.log(address);

        if (transaction.input.adress === address) {
          hasConductedTransaction = true;
        }

        const addressOutput = transaction.outputMap[address];

        if (addressOutput) {
          outputsTotal = outputsTotal + addressOutput;
        }
      }

      if (hasConductedTransaction) {
        break;
      }
    }

    return hasConductedTransaction
      ? outputsTotal
      : INITIAL_BALANCE + outputsTotal;
  }
}

module.exports = Wallet;
