const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../services');
const { salesModel } = require('../../../models');

describe('services/salesService', () => {
  afterEach(sinon.restore);

  describe('create', () => {
    it('Se não passar nenhum produto retorna null', async () => {
      const sale = await salesService.create();

      expect(sale).to.deep.equal(null);
    });

    it('Se um produto não existir retorna null', async () => {
      sinon.stub(Promise, 'all').resolves([[]]);
      const products = [
        { productId: 1, quantity: 1 },
        { productId: 50, quantity: 5 }
      ]
      const sale = await salesService.create(products);

      expect(sale).to.deep.equal(null);
    });

    it('Se produtos estiver correto retorna o id da venda e uam lista de itens vendidos', async () => {
      sinon.stub(salesModel, 'create').resolves(1);
      sinon.stub(Promise, 'all').resolves([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]);

      const products = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 }
      ]
      const sale = await salesService.create(products);

      expect(sale).to.deep.equal({ id: 1, itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] });
    });
  });

  describe('getAll', () => {
    it('Se o sale for invalido retorna null', async () => {
      sinon.stub(salesModel, 'getAll').resolves([]);

      const sales = await salesService.getAll();

      expect(sales).to.be.null;
    });

    it('Retorna a lista de vendas', async () => {
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

      sinon.stub(salesModel, 'getAll').resolves(data);

      const sales = await salesService.getAll();

      expect(sales).to.deep.equal(data);
    });
  })

  describe('getById', () => {
    it('Se o id for invalido retorna null', async () => {
      const sales = await salesService.getById();

      expect(sales).to.be.null;
    });

    it('Se o sale for invalido retorna null', async () => {
      sinon.stub(salesModel, 'getById').resolves([]);

      const sales = await salesService.getById(1);

      expect(sales).to.be.null;
    });

    it('Retorna a lista de produtos', async () => {
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

      sinon.stub(salesModel, 'getById').resolves(data);

      const sales = await salesService.getById(1);

      expect(sales).to.deep.equal(data);
    });
  })

  describe('delete', () => {
    it('deleta o produto', async () => {
      sinon.stub(salesModel, 'exclude').resolves(1);

      await salesService.exclude(1);
    });

    it('Se o produto não existir lança um erro', async () => {
      sinon.stub(salesModel, 'exclude').resolves(0);

      await expect(salesService.exclude(1)).to.be.rejectedWith(Error);
    });
  });

  describe('update', () => {
    it('atualiza o produto', async () => {
      const data = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ]

      const expectResult = { saleId: 1, itemsUpdated: [...data] }

      sinon.stub(salesModel, 'getById').resolves([
        { date: Date.now(), productId: 1, quantity: 5 },
        { date: Date.now(), productId: 2, quantity: 10 }
      ]);
      sinon.stub(salesModel, 'update').resolves();

      const result = await salesService.update(1, data);

      expect(result).to.deep.equal(expectResult);
    });

    it('Se o productId de algum dos produtos for invalido lança um error', async () => {
      const data = [
        { productI: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ]

      sinon.stub(salesModel, 'getById').resolves();
      sinon.stub(salesModel, 'update').resolves();

      await expect(salesService.update(1, data)).to.be.rejectedWith(Error);
    })

    it('Se o quantity de algum dos produtos for invalido lança um error', async () => {
      const data = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantit: 5 },
      ]

      sinon.stub(salesModel, 'getById').resolves();
      sinon.stub(salesModel, 'update').resolves();

      await expect(salesService.update(1, data)).to.be.rejectedWith(Error);
    })

    it('Se a venda não for encontrada lança um error', async () => {
      const data = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ]

      sinon.stub(salesModel, 'getById').resolves(null);
      sinon.stub(salesModel, 'update').resolves();

      await expect(salesService.update(1, data)).to.be.rejectedWith(Error);
    })

    it('Se o produto não for encontrado lança um error', async () => {
      const data = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ]

      sinon.stub(salesModel, 'getById').resolves([
        { date: Date.now(), productId: 999, quantity: 5 },
      ]);
      sinon.stub(salesModel, 'update').resolves();

      await expect(salesService.update(1, data)).to.be.rejectedWith(Error);
    })
  });

});
