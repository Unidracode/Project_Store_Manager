const connection = require('./connection');

const listSales = async () => {
  const p1 = 'SELECT sale_id AS saleId, date, product_id AS productId, quantity ';
  const p2 = 'FROM StoreManager.sales_products ';
  const p3 = 'INNER JOIN StoreManager.sales ';
  const p4 = 'ON StoreManager.sales_products.sale_id = StoreManager.sales.id ';
  const p5 = 'ORDER BY saleId, productId';
  const query = p1 + p2 + p3 + p4 + p5;
  const [result] = await connection.execute(query);
  return result;
};

const listSaleById = async (saleId) => {
  const p1 = 'SELECT date, product_id AS productId, quantity ';
  const p2 = 'FROM StoreManager.sales_products ';
  const p3 = 'INNER JOIN StoreManager.sales ';
  const p4 = 'ON StoreManager.sales_products.sale_id = StoreManager.sales.id ';
  const p5 = 'WHERE StoreManager.sales_products.sale_id = ? ';
  const p6 = 'ORDER BY StoreManager.sales_products.sale_id, productId';
  const query = p1 + p2 + p3 + p4 + p5 + p6;
  const [sale] = await connection.execute(query, [saleId]);
  return sale;
};

module.exports = {
  listSales,
  listSaleById,
};
