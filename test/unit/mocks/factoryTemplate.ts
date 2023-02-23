export default `
import ProductService from "../service/productService;
import ProductRepository from "../service/productRepository";

export default class ProductFactory {
    static getInstance() { 
      const repository = new ProductRepository();
      const service = new ProductService({ repository });
      return service;
    }
  }`;
