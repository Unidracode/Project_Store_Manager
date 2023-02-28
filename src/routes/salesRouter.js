const express = require('express');

const { salesController } = require('../controllers');
const salesMiddleware = require('../middlewares/salesMiddleware');

const router = express.Router();

router.route('/')
  .post(salesMiddleware.checkSale, salesController.create)
  .get(salesController.getAll);

router.route('/:id')
  .get(salesController.getById)
  .delete(salesController.exclude)
  .put(salesController.update);

module.exports = router;
