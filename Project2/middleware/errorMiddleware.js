// Centralized error handler for consistent JSON responses.
function errorMiddleware(err, req, res, next) {
  console.error(err.stack || err.message || err);

  res.status(500).json({
    error: 'Internal Server Error',
  });
}

module.exports = errorMiddleware;
