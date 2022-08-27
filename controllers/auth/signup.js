const { User, Verification } = require('../../db/models');
const { generateOTPCode } = require('../../utils/notifications/OTP');
const { generateToken } = require('../../utils/jwt');
const { userModel } = require('../../responseModel/users');

module.exports = {
  signup: async (req, res, next) => {
    try {
      const {
        fullName, email, mobile, password,
      } = req.body;

      const mobileExist = await User.findOne({ mobile });

      if (mobileExist) {
        return res.send({ code: 400, success: false, message: 'رقم الجوال موجود بالفعل' });
      }

      const user = await User.create({
        fullName,
        email,
        password,
        mobile,
      });

      const code = generateOTPCode();

      await Verification.create({ user: user._id, code, mobile });

      return res.send({ code: 201, success: true, message: 'تم انشاء الحساب بنجاح' });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.send({ code: 404, status: false, message: 'رقم الجوال أو كلمة المرور غير صحيحة' });
      }

      const passwordCheck = await user.isValidPassword(password);
      if (!passwordCheck) {
        return res.send({ code: 400, status: false, message: 'رقم الجوال أو كلمة المرور غير صحيحة' });
      }

      const token = generateToken({ _id: user._id, email: user.email });
      const userData = userModel(user);

      return res.send({
        code: 200, status: true, message: 'تم تسجيل الدخول بنجاح', token, data: userData,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  verifyMobile: async (req, res, next) => {
    const { code, mobile } = req.body;
    try {
      const user = await User.findOne({ mobile });
      if (!user) {
        return res.send({ code: 404, success: false, message: 'رقم الهاتف غير موجود' });
      }

      const verification = await Verification.findOne({ user: user._id, code, mobile });

      if (!verification) {
        return res.send({ code: 400, success: false, message: 'كود التحقق غير صالح' });
      }

      await verification.remove();

      user.isVerified = true;
      await user.save();

      const token = generateToken({ _id: user._id, email: user.email });
      const userData = userModel(user);

      return res.send({ code: 200, success: true, message: 'تم التحقق من رقم الجوال بنجاح ',
      token, data: userData });
   
    } catch (e) {
      next(e);
    }
  },
  resendCode: async (req, res, next) => {
    const { mobile } = req.body;
    try {
      const user = await User.findOne({ mobile });

      if (!user) {
        return res.send({ code: 404, success: false, message: 'رقم الهاتف غير موجود' });
      }

      const codeExist = await Verification.findOne({ user: user._id, mobile });

      if (!codeExist) {
        const code = generateOTPCode();
        const verification = new Verification({ user: user._id, code, mobile });
        await verification.save();
      } else {
        codeExist.code = generateOTPCode();
        await codeExist.save();
      }

      return res.send({ code: 200, success: true, message: 'تم إرسال الكود الى رقم الجوال' });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
