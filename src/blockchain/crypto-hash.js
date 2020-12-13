const crypto = require('crypto');

//Generating a sha256 hexadecimal value
const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');

  hash.update(
    inputs
      .sort()
      .map((input) => JSON.stringify(input))
      .join(' ')
  );

  return hash.digest('hex');
};

module.exports = cryptoHash;
