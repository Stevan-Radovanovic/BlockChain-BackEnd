const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
  timestamp: 1,
  lastHash: 'initial-last-hash',
  hash: 'initial-hash',
  data: [],
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
};

module.exports = { GENESIS_DATA, MINE_RATE };
