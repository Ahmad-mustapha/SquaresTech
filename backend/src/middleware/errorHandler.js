function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.name === "ZodError") {
    return res.status(400).json({
      message: "Validation Error",
      errors: err.errors.map((e) => ({
        path: e.path,
        message: e.message,
      })),
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
}

module.exports = errorHandler;
