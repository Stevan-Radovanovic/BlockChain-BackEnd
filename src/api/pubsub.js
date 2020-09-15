const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-d26a1f9a-ce15-48d3-b7e6-f380342dbfe6',
  subscribeKey: 'sub-c-1eab9c10-f5de-11ea-a11c-fa009153ffbc',
  secretKey: 'sec-c-ZWVjOTk0ZDItODIxYi00MDZiLTg0MmQtYzhhYWIwZWEzY2Y3',
};

const channels = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
};

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(channels) });
    this.pubnub.addListener(this.listener());
  }

  listener() {
    return {
      message: (messageObject) => {
        const { channel, message } = messageObject;
        console.log(`Channel: ${channel} | Message ${message}`);
        const parsedMessage = JSON.parse(message);
        if (channel === channels.BLOCKCHAIN) {
          this.blockchain.replaceChain(parsedMessage);
        }
      },
    };
  }

  publish({ channel, message }) {
    console.log('Publishing...');
    this.pubnub.publish({ channel, message });
  }

  broadcastChain() {
    this.publish({
      channel: channels.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
}

module.exports = PubSub;
