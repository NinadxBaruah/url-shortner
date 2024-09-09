const logInSessionId = new Map();
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
function setJwtToken(user) {
  if (!user) {
    return null;
  }
  return jwt.sign({id:user._id,name:user.firstName}, secret);
}

function verifyJwtToken(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
    setJwtToken,
    verifyJwtToken,
};
