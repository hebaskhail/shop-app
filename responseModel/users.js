module.exports.userModel = (user) => {
  const data = {
    _id: user._id,
    image: user.image || null,
    mobile: user.mobile,
    fullName: user.fullName,
    email: user.email,
    balance: user.balance,
    isVerified: user.isVerified,
  };

  return data;
};
