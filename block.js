const { GENESIS_DATA, MINE_RATE } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = this.difficulty;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static adjustDifficulty({ lastBlock, timestamp }) {
    const difficulty = lastBlock.difficulty;
    const difference = timeStamp - lastBlock.timestamp;

    if (difference > MINE_RATE) return difficulty - 1;
    if (difference < MINE_RATE) return difficulty + 1;
    return difficulty;
  }

  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    const difficulty = lastBlock.difficulty;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }
}

module.exports = Block;
