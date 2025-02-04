exports.errorHandler = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (err) {
        return res.status(500).json({
          message: "server/internal error",
          errMessage: err.message,
        });
      }
    };
  };
  