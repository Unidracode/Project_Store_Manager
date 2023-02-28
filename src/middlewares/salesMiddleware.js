const { saleProductSchema } = require('./schemas/salesSchema');

const getErrorWithCode = (error) => {
  const { message, type } = error.details[0];
  const err = new Error(message);
  err.code = 400;
  if (type === 'number.min') {
    err.code = 422;
  }
  return err;
};

const checkSale = (req, res, next) => {
  const products = req.body;

  const validates = products.map((product) => {
    const { error } = saleProductSchema.validate(product);
    return error ? getErrorWithCode(error) : null;
  });

  const error = validates.find((validate) => validate !== null);

  if (error) {
    return res.status(error.code).json({ message: error.message });
  }

  next();
};

module.exports = { checkSale };
