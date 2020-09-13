const Blockchain = require('./blockchain');

const blockchain = new Blockchain();
blockchain.addBlock({ data: 'initial' });

let prevT, nextT, nextB, timeDiff, average;

const times = [];

for (let i = 0; i < 5; i++) {
  prevT = blockchain.chain[blockchain.chain.length - 1].timestamp;
  blockchain.addBlock({ data: `block ${i}` });

  nextB = blockchain.chain[blockchain.chain.length - 1];

  nextT = nextB.timestamp;
  timeDiff = nextT - prevT;
  times.push(timeDiff);

  average = times.reduce((total, num) => total + num) / times.length;

  console.log(
    `Time to Mine: ${timeDiff}ms, Difficulty: ${nextB.difficulty}, Average time: ${average}ms`
  );
}
