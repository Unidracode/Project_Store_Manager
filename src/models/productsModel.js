const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [rows] = await connection.execute(query);
  return rows;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [rows] = await connection.execute(query, [id]);
  return rows;
};

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

const update = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [name, id]);

  return affectedRows;
};

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [id]);

  return affectedRows;
};

const searchName = async (q) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
  const [rows] = await connection.execute(query, [`%${q}%`]);
  return rows;
};

module.exports = { getAll, getById, create, update, exclude, searchName };
