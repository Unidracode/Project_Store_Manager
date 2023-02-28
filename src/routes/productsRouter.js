const express = require('express');

const { productsController } = require('../controllers');
const productsMiddleware = require('../middlewares/productsMiddleware');

const router = express.Router();

router.route('/')
  .get(productsController.getAll)
  .post(productsMiddleware.checkName, productsController.create);

router.route('/search')
  .get(productsController.search);

router.route('/:id')
  .get(productsController.getById)
  .put(productsController.update)
  .delete(productsController.exclude);

module.exports = router;
