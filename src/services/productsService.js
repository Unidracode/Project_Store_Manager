const { productsModel } = require('../models');
const productsValidate = require('./validates/products.validate');
const errorUtil = require('../utils/error.util');

const getAll = async () => {
  const products = await productsModel.getAll();
  if (!products || products.length === 0) return null;
  return products;
};

const getById = async (id) => {
  if (!id || typeof id !== 'number') return null;
  const product = await productsModel.getById(id);
  return product[0];
};

const create = async (name) => {
  if (!name) return null;
  const id = await productsModel.create(name);
  return { id, name };
};

const update = async (id, body) => {
  productsValidate.validateUpdateBody(body);
  const { name } = body;

  const affectedRows = await productsModel.update(id, name);

  // Case affectedRows equal 0
  if (!affectedRows) throw errorUtil(404, 'Product not found');

  return { name, id };
};

const exclude = async (id) => {
  const affectedRows = await productsModel.exclude(id);

  if (!affectedRows) throw errorUtil(404, 'Product not found');
};

const search = async (q) => productsModel.searchName(!q ? '' : q);

module.exports = { getAll, getById, create, update, exclude, search };
