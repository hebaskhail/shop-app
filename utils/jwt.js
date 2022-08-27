const jwt = require('jsonwebtoken');

module.exports.generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '40d',
  });
  return token;
};

module.exports.verifyIdToken = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data;
};
