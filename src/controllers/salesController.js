const { salesService } = require('../services');

const create = async (req, res) => {
  const products = req.body;

  const sale = await salesService.create(products);

  if (!sale) return res.status(404).json({ message: 'Product not found' });

  res.status(201).json(sale);
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  if (!sales) return res.status(404);

  res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.getById(+id);

  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sale);
};

const exclude = async (req, res) => {
  const { id } = req.params;

  await salesService.exclude(+id);

  res.status(204).end();
};

const update = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.update(+id, req.body);

  res.status(200).json(result);
};

module.exports = { create, getAll, getById, exclude, update };
