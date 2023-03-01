const express = require('express');
const { productsController } = require('../controllers');
const findProductById = require('../middlewares/findProductById');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.listProductById,
);

router.post(
  '/',
  validateName,
  productsController.addProduct,
);

router.put(
  '/:id',
  validateName,
  productsController.updateProduct,
);

router.delete(
  '/:id',
  findProductById,
  productsController.deleteProduct,
);

module.exports = router;
