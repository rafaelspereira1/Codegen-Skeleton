export default `
import ProductService from "../service/ProductService";
import ProductRepository from "../service/ProductRepository";

export default class ProductFactory {
    static getInstance() {
      const repository = new ProductRepository();
      const service = new ProductService({ repository });
      return service;
    }
  }`;
