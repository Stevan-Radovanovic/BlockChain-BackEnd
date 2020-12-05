const MINE_RATE = 1000;
const INITIAL_BALANCE = 1000;
const MINERS_REWARD = 50;

const REWARD_INPUT = {
  address: 'Official-Authorized-Reward',
};

const GENESIS_DATA = {
  timestamp: Date.now(),
  lastHash: 'initial-last-hash',
  hash: 'initial-hash',
  data: [],
  difficulty: 3,
  nonce: 0,
};

module.exports = {
  GENESIS_DATA,
  MINE_RATE,
  INITIAL_BALANCE,
  MINERS_REWARD,
  REWARD_INPUT,
};
