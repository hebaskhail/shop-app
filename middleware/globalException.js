module.exports = {
  routesNotFound: (req, res, next) => {
    const error = new Error(`Url Not found -${req.originalUrl}`);
    res.statusCode = 404;
    next(error);
  },

  globalErrorHandler: (error, req, res, next) => {
    console.log(error.message);
    console.log(error);
    return res.send({
      code: 500,
      success: false,
      message: 'server error',
      data: null,
    });
  },
};
