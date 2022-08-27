const Joi = require('joi');

module.exports = {
  registerSchema: Joi.object().keys({
    fullName: Joi.string().min(3).required(),
    mobile: Joi.string().required(),
    password: Joi.string()
      .min(5)
      .regex(/^[a-zA-Z0-9]{5,30}$/)
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  }),

  loginSchema: Joi.object().keys({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string()
      .min(5)
      .regex(/^[a-zA-Z0-9]{5,30}$/)
      .required(),
  }),

  forgetPasswordSchema: Joi.object().keys({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  }),

  resendCodeSchema: Joi.object().keys({
    mobile: Joi.string().required(),
  }),
  resetPasswordSchema: Joi.object().keys({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string()
      .min(5)
      .regex(/^[a-zA-Z0-9]{5,30}$/)
      .required(),
    code: Joi.string().length(4),
  }),

  confirmPasswordSchema: Joi.object().keys({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    code: Joi.string().length(4),
  }),

  verifyOTPSchema: Joi.object().keys({
    mobile: Joi.string().required(),
    code: Joi.string().length(4),
  }),
};
