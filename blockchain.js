const Block = require('./block');
const CryptoHash = require('./crypto-hash');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const block = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(block);
  }

  static isValidChain(chain) {
    if (JSON.stringify(Block.genesis()) !== JSON.stringify(chain[0])) {
      return false;
    }

    for (const index = 1; index < chain.length; index++) {
      const current = chain[i];
      const previous = chain[i - 1];
      if (current.lastHash !== previous.hash) return false;
      if (
        CryptoHash(current.lastHash, current.data, current.timestamp) !==
        current.hash
      )
        return false;
    }

    return true;
  }

  replaceChain(newChain) {
    if (this.chain.length >= newChain.length) {
      return;
    }

    if (Blockchain.isValidChain(newChain)) {
      this.chain = newChain;
    }
  }
}

module.exports = Blockchain;
