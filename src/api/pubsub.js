const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-d26a1f9a-ce15-48d3-b7e6-f380342dbfe6',
  subscribeKey: 'sub-c-1eab9c10-f5de-11ea-a11c-fa009153ffbc',
  secretKey: 'sec-c-ZWVjOTk0ZDItODIxYi00MDZiLTg0MmQtYzhhYWIwZWEzY2Y3',
};

const channels = {
  TEST: 'Test',
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(channels) });
    this.pubnub.addListener(this.listener());
  }

  listener() {
    return {
      message: (messageObject) => {
        const { channel, message } = messageObject;
        console.log(`Channel: ${channel} | Message: ${message}`);
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}

module.exports = PubSub;
