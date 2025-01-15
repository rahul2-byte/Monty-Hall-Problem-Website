const crypto = require("crypto");

function getSecureRandomInt() {
 // generate random number between 0 and 10
  const range = 4;
  const randomBytes = crypto.randomBytes(4).readUInt32BE(0);
  return 1 + (randomBytes % range);
}


function getLuckyCard() {
    let random_array = [getSecureRandomInt(), getSecureRandomInt(), getSecureRandomInt()].sort((a, b) => a - b);
    return random_array[0];
}


exports.getLuckyCard = getLuckyCard;
