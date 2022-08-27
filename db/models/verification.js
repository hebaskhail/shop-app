const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  code: { type: String },
  createdAt: { type: Date, expires: '2m', default: Date.now },
  email: { type: String },
  mobile: { type: String },
});

const Verification = mongoose.model('Verification', verificationSchema);
module.exports = Verification;
