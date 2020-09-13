const Blockchain = require('./blockchain');
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
    const difference = timestamp - lastBlock.timestamp;
    let newDifficulty = difficulty;

    if (difference > MINE_RATE) newDifficulty -= 1;
    if (difference < MINE_RATE) newDifficulty += 1;

    return newDifficulty >= 1 ? newDifficulty : 1;
  }

  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let difficulty = lastBlock.difficulty;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({ lastBlock, timestamp });
      console.log(`Difficulty ${difficulty} TimeStamp ${timestamp}`);
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
