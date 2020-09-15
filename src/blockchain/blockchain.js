const Block = require('./block');
const CryptoHash = require('./crypto-hash');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
    console.log('Created a Blockchain');
  }

  addBlock({ data }) {
    const block = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(block);
    console.log('Added a Block to the Chain');
  }

  static isValidChain(chain) {
    if (chain[0].hash !== Block.genesis().hash) {
      console.error('Validation Error: First Block not a Genesis block');
      return false;
    }

    for (let index = 1; index < chain.length; index++) {
      const current = chain[i];
      const previous = chain[i - 1];

      if (Math.abs(current.difficulty - previous.difficulty) !== 1)
        return false;

      if (current.lastHash !== previous.hash) return false;

      if (
        CryptoHash(
          current.lastHash,
          current.data,
          current.timestamp,
          current.difficulty,
          current.nonce
        ) !== current.hash
      ) {
        console.error('Validation Error: LastHash = Hash Rule not followed');
        return false;
      }
    }

    console.log('Chain succesfully validated');
    return true;
  }

  replaceChain(newChain) {
    if (this.chain.length >= newChain.length) {
      console.error(
        'Replacement Error: New Chain not longer than the previous one'
      );
      return;
    }

    if (Blockchain.isValidChain(newChain)) {
      console.log('Chain succesfully replaced');
      this.chain = newChain;
    }
  }
}

module.exports = Blockchain;
