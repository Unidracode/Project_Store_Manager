const Joi = require('joi');
const errorWrapper = require('../../utils/errorWrapper');
const errorUtil = require('../../utils/error.util');

module.exports = {
  validateUpdateBody: (body) => {
    const schema = Joi.object({
      productId: Joi.number().integer().required()
        .error((errors) => errorWrapper(errors))
        .label('productId'),
      quantity: Joi.number().integer().min(1).required()
        .error((errors) => errorWrapper(errors))
        .label('quantity'),
    });

    const arraySchema = Joi.array().items(schema);

    const { error } = arraySchema.validate(body);

    if (error) throw errorUtil(error.code || 400, error.message);
  },
};
