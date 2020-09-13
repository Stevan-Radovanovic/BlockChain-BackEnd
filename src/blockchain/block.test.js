const Block = require('./block');

describe('Block', () => {
  const timestamp = 'date';
  const lastHash = 'last-hash';
  const hash = 'hash';
  const data = ['blockchain', 'shit'];
  const block = new Block({ timestamp, lastHash, hash, data });

  it('has all the properties', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });
});
