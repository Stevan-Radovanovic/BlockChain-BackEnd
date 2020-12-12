const Block = require('./block');
const CryptoHash = require('./crypto-hash');
const { REWARD_INPUT, MINERS_REWARD } = require('../../config');
const Transaction = require('../crypto/transaction');

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

    for (let i = 1; i < chain.length; i++) {
      if (Math.abs(chain[i].difficulty - chain[i - 1].difficulty) !== 1)
        return false;

      if (chain[i].lastHash !== chain[i - 1].hash) return false;

      if (
        CryptoHash(
          chain[i].lastHash,
          chain[i].data,
          chain[i].timestamp,
          chain[i].difficulty,
          chain[i].nonce
        ) !== chain[i].hash
      ) {
        console.error('Validation Error: LastHash = Hash Rule not followed');
        return false;
      }
    }
    console.log('Chain succesfully validated');
    return true;
  }

  replaceChain(newChain, onSuccess) {
    if (this.chain.length >= newChain.length) {
      console.error(
        'Replacement Error: New Chain not longer than the previous one.'
      );
      return;
    }

    if (Blockchain.isValidChain(newChain)) {
      console.log('Chain succesfully replaced');
      if (onSuccess) onSuccess();
      this.chain = newChain;
    }
  }

  isTransactionDataValid({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      let rewardTransactionCount = 0;

      for (let transaction of block.data) {
        if (transaction.input.address === REWARD_INPUT.address) {
          rewardTransactionCount++;

          if (rewardTransactionCount > 1) {
            console.error('Only one Miner Reward is allowed');
            return false;
          }

          if (Object.values(transaction.outputMap)[0] !== MINERS_REWARD) {
            console.error(
              'Reward transaction does not match the miners reward'
            );
            return false;
          }
        } else {
          if (!Transaction.verifyTransaction(transaction)) {
            console.error('Invalid transaction!');
            return false;
          }
        }
      }
    }

    return true;
  }
}

module.exports = Blockchain;
