const { expect } = require('chai');
const sinon = require('sinon');

const { productsController } = require('../../../controllers');
const { productsService } = require('../../../services');

const data = [{ id: 1, name: "Martelo de Thor" }, { id: 2, name: "Traje de encolhimento" }];

describe('controllers/productsController', () => {
  afterEach(sinon.restore);
  describe('getAll', () => {

    it('Se não houver produtos retorna 404 e uma mensagem de produtos não encontrados', async () => {
      sinon.stub(productsService, 'getAll').resolves(null);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productsController.getAll({}, res);

      expect(res.status.calledWith(404)).to.true;
      expect(res.json.calledWith({ message: 'Products not found' })).to.true;
    });

    it('Se houver produtos retorna codigo 200 e a lista de produtos', async () => {
      sinon.stub(productsService, 'getAll').resolves(data);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productsController.getAll({}, res);

      expect(res.status.calledWith(200)).to.true;
      expect(res.json.calledWith(data)).to.true;
    });
  });

  describe('getById', () => {
    it('Se o produto não for encontrado retorna o codigo 404 e uma mensagem produto não encontrado', async () => {
      sinon.stub(productsService, 'getById').resolves(null);
      const req = { params: { id: '1' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productsController.getById(req, res);

      expect(res.status.calledWith(404)).to.true;
      expect(res.json.calledWith({ message: 'Product not found' })).to.true;
    });

    it('Se o produto for encontrado retorna o codigo 200 e o produto', async () => {
      sinon.stub(productsService, 'getById').resolves(data[0]);
      const req = { params: { id: '1' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productsController.getById(req, res);

      expect(res.status.calledWith(200)).to.true;
      expect(res.json.calledWith(data[0])).to.true;
    });

  });

  describe('create', () => {
    it('Se o produto não for criado chama o next com um erro', async () => {
      sinon.stub(productsService, 'create').resolves(null);
      const errorMessage = 'Não foi possivel criar um produto.';

      const req = { body: {} };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      const next = sinon.stub().returns();

      await productsController.create(req, res, next);

      expect(next.calledOnce).to.true;
      expect(next.getCall(0).args[0].message).to.equal(errorMessage);
    });

    it('Se o produto for criado retorna codigo 201 nome e o id do produto criado', async () => {
      sinon.stub(productsService, 'create').resolves({ id: 1, name: 'Martelo Enferrujado' });

      const req = { body: { name: 'Martelo Enferrujado' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      const next = sinon.stub().returns();

      await productsController.create(req, res, next);

      expect(res.status.calledWith(201)).to.true;
      expect(res.json.calledWith({ id: 1, name: 'Martelo Enferrujado' })).to.true;
    });
  });
  describe('update', () => {
    it('Se o produto for atualizado retorna status 200 e objeto com id', async () => {
      sinon.stub(productsService, 'update').resolves({ name: 'Martelo Enferrujado', id: 1 });

      const req = { body: { name: 'Martelo Enferrujado' }, params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productsController.update(req, res);

      expect(res.status.calledWith(200)).to.true;
      expect(res.json.calledWith({ id: 1, name: 'Martelo Enferrujado' })).to.true;
    });
  });

  describe('delete', () => {
    it('Se o produto for deletado retorna status 204', async () => {
      sinon.stub(productsService, 'exclude').resolves();

      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        end: sinon.stub().returns(),
      }

      await productsController.exclude(req, res);

      expect(res.status.calledWith(204)).to.true;
    });
  });

  describe('search', () => {
    it('Exibe a lista de produtos', async () => {
      const data = [
        { "id": 1, "name": "Martelo de Thor" },
        { "id": 2, "name": "Capacete do Homem de Ferro" }
      ]

      sinon.stub(productsService, 'search').resolves(data);

      const req = { query: { q: '' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productsController.search(req, res);

      expect(res.status.calledWith(200)).to.true;
      expect(res.json.calledWith(data)).to.true;
    });

    it('Exibe o produto buscado', async () => {
      const data = [
        { "id": 1, "name": "Martelo de Thor" }
      ]

      sinon.stub(productsService, 'search').resolves(data);

      const req = { query: { q: 'Martelo' } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await productsController.search(req, res);

      expect(res.status.calledWith(200)).to.true;
      expect(res.json.calledWith(data)).to.true;
    });
  });

});
