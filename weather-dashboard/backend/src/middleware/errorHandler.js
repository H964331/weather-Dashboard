// Centralized error handler — keep this registered last in app.js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Something went wrong on the server',
  });
};
