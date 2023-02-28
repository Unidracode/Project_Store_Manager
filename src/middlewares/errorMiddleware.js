module.exports = async (err, _req, res, _next) =>
  res.status(err.code || 500).json({ message: err.message || 'Internal server error' });
