const express = require('express');

const app = express();

app.use('/auth', require('./auth'));
// app.use('/home', require('./home'));
// app.use('/search', require('./search'));
// app.use('/product', require('./product'));
// app.use('/cart', require('./cart'));
// app.use('/wishlist', require('./wishlist'));
// app.use('/wallet', require('./wallet'));
// app.use('/blog', require('./blog'));
// app.use('/coupon', require('./coupon'));
// app.use('/membership', require('./membership'));
// app.use('/paypal', require('./paypal'));
// app.use('/address', require('./address'));
// app.use('/profile', require('./profile'));
// app.use('/order', require('./order'));
// app.use('/order-process', require('./orderProcess'));

module.exports = app;
