const { User, Verification } = require('../../db/models');
const { generateOTPCode } = require('../../utils/notifications/OTP');

module.exports = {
  forgetPassword: async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.send({ code: 404, status: false, message: 'البريد الالكتروني غير موجود' });
      }

      const codeExist = await Verification.findOne({ user: user._id, email });

      if (!codeExist) {
        const code = generateOTPCode();
        const verification = new Verification({ user: user._id, code, email });
        await verification.save();
      } else {
        codeExist.code = generateOTPCode();
        await codeExist.save();
      }

      return res.send({ code: 200, status: true, message: 'تم ارسال الكود بنجاح' });
    } catch (e) {
      next(e);
    }
  },

  resetPassword: async (req, res, next) => {
    const { mobile, password, code } = req.body;
    try {
      const user = await User.findOne({ mobile });

      if (!user) {
        return res.send({ code: 404, status: false, message: 'البريد الالكتروني غير موجود' });
      }

      const verification = await Verification.findOne({ user: user._id, code });

      if (!verification) {
        return res.send({ code: 400, success: false, message: 'كود التحقق غير صالح' });
      }

      user.password = password;
      await user.save();
      await verification.remove();

      return res.send({ code: 204, success: true, message: 'تمت العملية بنجاح' });
    } catch (e) {
      next(e);
    }
  },

  verifyOTP: async (req, res, next) => {
    const { code, email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.send({ code: 404, success: false, message: 'هذا الايميل غير موجود' });
      }
      const verification = await Verification.findOne({ user: user._id, code, email });

      if (!verification) {
        return res.send({ code: 400, success: false, message: 'كود التحقق غير صالح' });
      }
      await verification.remove();

      return res.send({
        code: 200,
        success: true,
        message: 'تم التحقق من الكود المرسل بنجاح',
      });
    } catch (e) {
      next(e);
    }
  },
};
