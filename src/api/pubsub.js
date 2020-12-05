const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-d26a1f9a-ce15-48d3-b7e6-f380342dbfe6',
  subscribeKey: 'sub-c-1eab9c10-f5de-11ea-a11c-fa009153ffbc',
  secretKey: 'sec-c-ZWVjOTk0ZDItODIxYi00MDZiLTg0MmQtYzhhYWIwZWEzY2Y3',
};

const channels = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION',
};

class PubSub {
  constructor({ blockchain, transactionPool, wallet }) {
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(channels) });
    this.pubnub.addListener(this.listener());
  }

  listener() {
    return {
      message: (messageObject) => {
        const { channel, message } = messageObject;
        console.log(`Channel: ${channel} | Message received`);
        const parsedMessage = JSON.parse(message);
        if (channel === channels.BLOCKCHAIN) {
          this.blockchain.replaceChain(parsedMessage);
        }

        if (channel === channels.TRANSACTION) {
          if (
            !this.transactionPool.findTransaction({
              inputAdress: this.wallet.publicKey,
            })
          ) {
            this.transactionPool.setTransaction(parsedMessage);
          }
        }
      },
    };
  }

  async publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }

  broadcastChain() {
    this.publish({
      channel: channels.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: channels.TRANSACTION,
      message: JSON.stringify(transaction),
    });
  }
}

module.exports = PubSub;
