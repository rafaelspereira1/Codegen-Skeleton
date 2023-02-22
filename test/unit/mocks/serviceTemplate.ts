export default `
export default class ProductService {
  constructor({ repository: productRepository }) {
    this.productRepository = productRepository;
  }

  create(data: string) {
    return this.productRepository.create(data);
  }

  read(query: string) {
    return this.productRepository.read(query);
  }

  update(id: number, data: string) {
    return this.productRepository.update(id, data);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}`;
