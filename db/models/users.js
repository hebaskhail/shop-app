const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true },
    email: {
      type: String, required: true, trim: true, unique: true,
    },
    mobile: { type: String, sparse: true, unique: true },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    image: { type: String },
  },
  { timestamps: true },
);

userSchema.index({ location: '2dsphere' });

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

userSchema.methods.hashPassword = async function (password) {
  const user = this;
  user.password = await bcrypt.hash(password, 8);
  return user.password;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
