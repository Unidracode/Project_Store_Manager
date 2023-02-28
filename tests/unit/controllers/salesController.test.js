const { expect } = require('chai');
const sinon = require('sinon');

const { salesController } = require('../../../controllers');
const { salesService } = require('../../../services');

describe('controllers/salesController', () => {
  afterEach(sinon.restore);

  describe('create', () => {
    it('Se um produto não existir retorna codigo 404 e a mensagem "Product not found"', async () => {
      sinon.stub(salesService, 'create').resolves(null);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await salesController.create({}, res);

      expect(res.status.calledWith(404)).to.true;
      expect(res.json.calledWith({ message: 'Product not found' })).to.true;
    });

    it('Se a venda foi feita retorna codigo 201 e um objeto com id da venda e os produtos', async () => {
      const resolves = {
        id: 5,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 }
        ]
      };

      sinon.stub(salesService, 'create').resolves(resolves);

      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await salesController.create({}, res);

      expect(res.status.calledWith(201)).to.true;
      expect(res.json.calledWith(resolves)).to.true;
    });
  })

  describe('getAll', () => {
    it('Se não encontrar vendas retorna o codigo 404', async () => {
      sinon.stub(salesService, 'getAll').resolves(null);
      const res = {
        status: sinon.stub().returns(),
      }

      await salesController.getAll({}, res);

      expect(res.status.calledWith(404)).to.true;
    });
    it('Se encontrar vendas retorna o codigo 200 e a lista de vendas', async () => {
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
      ];

      sinon.stub(salesService, 'getAll').resolves(data);

      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await salesController.getAll({}, res);

      expect(res.status.calledWith(200)).to.true;
      expect(res.json.calledWith(data)).to.true;
    });
  })

  describe('getById', () => {
    it('Se não encontrar nenhuma venda com o id pedido retorna codigo 404 e "Sale not found"', async () => {
      sinon.stub(salesService, 'getById').resolves(null);
      const req = { params: { id: '1' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await salesController.getById(req, res);

      expect(res.status.calledWith(404)).to.true;
      expect(res.json.calledWith({ message: 'Sale not found' })).to.true;
    });
    it('Se encontrar uma venda retorna codigo 200 e a lista de produtos', async () => {
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
      sinon.stub(salesService, 'getById').resolves(data);
      const req = { params: { id: '1' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await salesController.getById(req, res);

      expect(res.status.calledWith(200)).to.true;
      expect(res.json.calledWith(data)).to.true;
    });
  })

  describe('delete', () => {
    it('Se a venda for deletada retorna status 204', async () => {
      sinon.stub(salesService, 'exclude').resolves();

      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        end: sinon.stub().returns(),
      }

      await salesController.exclude(req, res);

      expect(res.status.calledWith(204)).to.true;
    });
  });

  describe('update', () => {
    it('Se a venda for atualizada retorna status 200', async () => {
      const data = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ]

      const expectResult = { saleId: 1, itemsUpdated: [...data] }
      sinon.stub(salesService, 'update').resolves(expectResult);

      const req = { params: { id: 1 }, body: [...data] };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await salesController.update(req, res);

      expect(res.status.calledWith(200)).to.true;
      expect(res.json.calledWith(expectResult)).to.true;
    });
  });

});
