const { nameSchema } = require('./schemas/productsSchema');

const checkName = (req, res, next) => {
  const { name } = req.body;

  const { error } = nameSchema.validate(name);

  if (error) return res.status(error.code).json({ message: error.message });

  next();
};

module.exports = { checkName };
