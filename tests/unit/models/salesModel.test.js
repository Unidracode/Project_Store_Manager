const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const { salesModel } = require('../../../models');

describe('models/salesModel', () => {
  afterEach(sinon.restore);
  describe('create', () => {
    it('Retorna o id da venda', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

      const id = await salesModel.create();

      expect(id).to.equal(1);
    });
  });

  describe('addProductToSale', () => {
    it('Retorna um objeto com o produto e quantidade', async () => {
      sinon.stub(connection, 'execute').resolves();

      const saleId = 1;
      const productId = 2;
      const productQuantity = 3;

      const product = await salesModel.addProductToSale(saleId, productId, productQuantity);

      expect(product).to.deep.equal({ productId: 2, quantity: 3 });
    });
  });

  describe('getAll', () => {
    it('Retorna uma lista de vendas', async () => {
      const data = [
        {
          saleId: 1,
          date: "2022-07-07T07:38:08.000Z",
          productId: 1,
          quantity: 5
        },
        {
          saleId: 2,
          date: "2022-07-07T07:38:08.000Z",
          productId: 3,
          quantity: 15
        }
      ]
      sinon.stub(connection, 'execute').resolves([data]);

      const sales = await salesModel.getAll();

      expect(sales).to.deep.equal(data);
    });
  })

  describe('getById', () => {
    it('Retorna a lista de vendas com o id pedido', async () => {
      const data = [
        {
          date: "2022-07-07T07:38:08.000Z",
          productId: 1,
          quantity: 5
        },
        {
          date: "2022-07-07T07:38:08.000Z",
          productId: 2,
          quantity: 10
        }
      ]

      sinon.stub(connection, 'execute').resolves([data]);

      const sales = await salesModel.getById(1);

      expect(sales).to.deep.equal(data);
    });
  })

  describe('exclude', () => {
    it('Retorna as linhas afetadas pela operação', async () => {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const affectedRows = await salesModel.exclude(1);

      expect(affectedRows).to.equal(1);
    });
  });

  describe('update', () => {
    it('successfully', async () => {
      sinon.stub(connection, 'query').resolves();

      await expect(salesModel.update(1, { productId: 1, quantity: 10 })).to.be.fulfilled;
    });
  });

});
