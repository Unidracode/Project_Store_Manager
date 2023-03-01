const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { products, newProduct } = require('../mocks/productsMock');

describe('Testes de unidade da camada Service de products', function () {
  describe('Recuperando a lista com todos os produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      sinon.stub(productsModel, 'listProducts').resolves(products);
      const result = await productsService.listProducts();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(products);
    });
  });

  describe('Recuperando um produto através do seu id', function () {
    it('retorna o product caso encontre o ID', async function () {
      sinon.stub(productsModel, 'listProductById').resolves(products[0])
      const result = await productsService.listProductById(1);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(products[0]);
    });

    it('retorna um erro caso o produto não exista', async function () {
      const result = await productsService.listProductById(999);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('retorna um erro caso receba um ID inválido', async function () {
      const result = await productsService.listProductById('a');
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
  });

  describe('Adicionando product com valores válidos', function () {
    it('retorna o ID do product adicionado', async function () {
      sinon.stub(productsModel, 'addProduct').resolves(4)
      sinon.stub(productsModel, 'listProductById').resolves(newProduct);
      const result = await productsService.addProduct(newProduct.name);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(newProduct);
    });
  });

  describe('Adicionando product com valores inválidos', function () {
    it('retorna um erro ao passar um nome inválido', async function () {
      const result = await productsService.addProduct('');
      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
