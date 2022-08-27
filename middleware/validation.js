module.exports.validation = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: true });
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((e) => e.message).join(',');

    next(message);
  }
};
