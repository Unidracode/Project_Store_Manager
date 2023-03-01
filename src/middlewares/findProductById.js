const { productsModel } = require('../models');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  const result = await productsModel.listProductById(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });

  return next();
};
