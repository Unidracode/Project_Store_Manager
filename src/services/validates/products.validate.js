const Joi = require('joi');
const errorUtil = require('../../utils/error.util');
const errorWrapper = require('../../utils/errorWrapper');

module.exports = {
  validateUpdateBody: (body) => {
    const nameSchema = Joi.object({
      name: Joi.string().min(5).required().error((errors) => errorWrapper(errors)),
    });

    const { error } = nameSchema.validate(body);

    if (error) throw errorUtil(error.code || 400, error.message);
  },
};
