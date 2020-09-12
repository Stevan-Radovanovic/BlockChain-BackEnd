const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;

    return new this({
      timestamp,
      lastHash,
      data,
      hash: cryptoHash(timestamp, lastHash, data),
    });
  }
}

module.exports = Block;

const block1 = Block.genesis();
const block2 = Block.mineBlock({ lastBlock: block1, data: 'dummy' });
const block3 = Block.mineBlock({ lastBlock: block2, data: 'dummy' });
console.log(block1, block2, block3);
