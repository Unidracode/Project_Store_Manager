const Joi = require('joi');

const nameSchema = Joi.string().min(5).max(10).required()
  .error((errors) => {
    const { code } = errors[0];
    if (code === 'any.required') {
      const customError = new Error('"name" is required');
      customError.code = 400;
      return customError;
    }
    if (code === 'string.min') {
      const customError = new Error('"name" length must be at least 5 characters long');
      customError.code = 422;
      return customError;
    }
    const customError = new Error(code);
    customError.code = 400;
    return customError;
  });

module.exports = { nameSchema };
