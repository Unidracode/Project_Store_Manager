const { productsModel } = require('../models');
const schema = require('./Validations/validationsInputValues');

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return { type: null, message: products };
};

const listProductById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.listProductById(productId);

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const addProduct = async (productName) => {
  const error = schema.validateNewProduct(productName);
  if (error.type) return error;

  const newProductId = await productsModel.addProduct({ name: productName });
  const newProduct = await productsModel.listProductById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (id, newName) => {
  const error = schema.validateNewProduct(newName);
  if (error.type) return error;

  const oldProduct = await productsModel.listProductById(id);
  if (!oldProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.updateProduct(id, newName);

  return { type: null, message: { ...oldProduct, name: newName } };
};

const deleteProduct = async (id) => {
  console.log('service', id);

  await productsModel.deleteProduct(id);

  return { type: null, message: null };
};

module.exports = {
  listProducts,
  listProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
