const chai = require('chai');
chai.use(require('chai-as-promised'));
const sinon = require('sinon');

const { productsService } = require('../../../services');
const { productsModel } = require('../../../models');
const { expect } = require('chai');

const data = [{ id: 1, name: "Martelo de Thor" }, { id: 2, name: "Traje de encolhimento" }];

describe('services/productsService', () => {
  afterEach(sinon.restore);
  describe('getAll', () => {

    it('Retorna uma lista', async () => {
      sinon.stub(productsModel, 'getAll').resolves(data);

      const products = await productsService.getAll();

      expect(products).to.be.an('array');
    });

    it('Retorna uma lista de produtos', async () => {
      sinon.stub(productsModel, 'getAll').resolves(data);

      const products = await productsService.getAll();

      expect(products).to.deep.equal(data);
    });

    it('Se a lista de produtos estiver vazia retorna null', async () => {
      sinon.stub(productsModel, 'getAll').resolves([]);

      const products = await productsService.getAll();

      expect(products).to.equal(null);
    });
  });

  describe('getById', () => {

    beforeEach(() => {
      sinon.stub(productsModel, 'getById').resolves([data[0]]);
    });

    it('Retorna um objeto', async () => {
      const product = await productsService.getById(1);

      expect(product).to.be.an('object');
    });

    it('Retona o id pedido', async () => {
      const product = await productsService.getById(1);

      expect(product.id).to.equal(1);
    });

    it('Se o id não for válido retorna null ', async () => {
      const product = await productsService.getById();

      expect(product).to.be.null;
    });
  });

  describe('create', () => {
    it('Se o name não for informado retorna null', async () => {
      const result = await productsService.create();

      expect(result).to.be.null;
    });

    it('Se o name for passado retorna um objeto com name e id', async () => {
      sinon.stub(productsModel, 'create').resolves(1);

      const result = await productsService.create('Martelo Enferrujado');

      expect(result).to.deep.equal({ id: 1, name: 'Martelo Enferrujado' });
    });
  })

  describe('update', () => {
    it('Se o produto existir atualiza o nome', async () => {
      sinon.stub(productsModel, 'update').resolves(1);

      const result = await productsService.update(1, { name: 'Martelo' });

      expect(result).to.deep.equal({ id: 1, name: 'Martelo' });
    });

    it('Se o produto não existir lança um erro', async () => {
      sinon.stub(productsModel, 'update').resolves(0);

      await expect(productsService.update(1, { name: 'Martelo' })).to.be.rejectedWith(Error);
    });
  });

  describe('exclude', () => {
    it('deleta o produto', async () => {
      sinon.stub(productsModel, 'exclude').resolves(1);

      await expect(productsService.exclude(1)).to.be.fulfilled;
    });

    it('Se o produto não existir lança um erro', async () => {
      sinon.stub(productsModel, 'exclude').resolves(0);

      await expect(productsService.exclude(1)).to.be.rejectedWith(Error);
    });
  });

  describe('search', () => {
    it('encontra o produto', async () => {
      const data = [
        { "id": 1, "name": "Martelo de Thor" }
      ]

      sinon.stub(productsModel, 'searchName').resolves(data);

      const result = await productsService.search('Martelo');

      expect(result).to.deep.equal(data);
    });

    it('exibe todos os produtos', async () => {
      const data = [
        { "id": 1, "name": "Martelo de Thor" },
        { "id": 2, "name": "Capacete do Homem de Ferro" }
      ]

      sinon.stub(productsModel, 'searchName').resolves(data);

      const result = await productsService.search('');

      expect(result).to.deep.equal(data);
    });
  })

});
