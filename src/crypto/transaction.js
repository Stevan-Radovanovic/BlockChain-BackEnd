const uuid = require('uuid/v1');
const { verifySignature } = require('./elliptic');
class Transaction {
  constructor({ senderWallet, recipient, amount }) {
    this.id = uuid();
    this.outputMap = this.createOutputMap({ senderWallet, recipient, amount });
    this.input = this.createInput({ senderWallet, outputMap });
  }

  createOutputMap({ senderWallet, recipient, amount }) {
    const outputMap = {};
    outputMap[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;
    return outputMap;
  }

  createInput({ senderWallet, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      adress: senderWallet.publicKey,
      signature: senderWallet.sign(outputMap),
    };
  }

  update({senderWallet,recipient,amount}) {

    if(amount > this.outputMap[senderWallet.publicKey]) {
      console.error('Transaction Error: Amount exceeds current balance');
      //TODO: Add error throwing?
      return;
    }

    if(!outputMap[recipient]) {
      this.outputMap[recipient] = amount;
    } else {
      this.outputMap[recipient] = this.outputMap[recipient] + amount;
    }
    
    outputMap[senderWallet.publicKey] = outputMap[senderWallet.publicKey] - amount;
    this.input = this.createInput( {senderWallet,outputMap: this.outputMap} );
  }

  static verifyTransaction(transaction) {
    const {
      input: { adress, amount, signature },
      outputMap,
    } = transaction;

    const outputTotal = Object.values(outputMap).reduce(
      (total, amount) => total + amount
    );

    if (amount !== outputTotal) {
      console.error('Transaction invalid!');
      return false;
    }

    if (!verifySignature({ publicKey: adress, data: outputMap, signature })) {
      console.error('Transaction invalid!');
      return false;
    }

    return true;
  }
}

module.exports = Transaction;
