export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.type === 'StripeError') {
    return res.status(402).json({
      message: err.message,
      code: err.code
    });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};