const express = require('express');

const router = express.Router();
const {
  signup, login, verifyMobile, resendCode,
} = require('../../controllers/auth/signup');
const {
  forgetPassword, resetPassword, verifyOTP, updatePassword,
} = require('../../controllers/auth/password');
const {
  registerSchema, loginSchema, verifyOTPSchema, resendCodeSchema, forgetPasswordSchema, resetPasswordSchema, confirmPasswordSchema,
} = require('../../validationSchema/auth');
const { validation } = require('../../middleware/validation');
const { isAuthenticated } = require('../../middleware/auth');

router
  .post('/signup', validation(registerSchema), signup)
  .post('/login', validation(loginSchema), login)
  .put('/verify-mobile', validation(verifyOTPSchema), verifyMobile)
  .post('/resend-code', validation(resendCodeSchema), resendCode)
  .post('/forget', validation(forgetPasswordSchema), forgetPassword)
  .post('/confirm', validation(confirmPasswordSchema), verifyOTP)
  .put('/reset', validation(resetPasswordSchema), resetPassword);

module.exports = router;
