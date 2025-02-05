exports.errorHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error("Error:", err.message); // Logs the error (optional)
      next(err); // Passes error to Express error-handling middleware
    }
  };
};
