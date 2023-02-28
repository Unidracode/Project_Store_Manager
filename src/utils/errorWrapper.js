const errorUtil = require('./error.util');

module.exports = (errors) => {
  const err = errors[0];

  switch (err.code) {
    case 'any.required':
      return errorUtil(400, `"${err.local.label}" is required`);
    case 'number.min':
      return errorUtil(422, `"${err.local.label}" must be greater than or equal to 1`);
    case 'string.min':
      return errorUtil(422, `"${err.local.label}" length must be at least 5 characters long`);
    default:
      return errors;
  }
};
