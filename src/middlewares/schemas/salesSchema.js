const Joi = require('joi');

const saleProductSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = { saleProductSchema };
