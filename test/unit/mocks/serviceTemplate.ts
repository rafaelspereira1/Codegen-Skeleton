export default {
  fileName: "productService",
  template: `
    interface Repository {
      create(data: string): Promise<any>;
      read(query: string): Promise<any>;
      update(id: number, data: string): Promise<any>;
      delete(id: number): Promise<any>;
    }
    export default class ProductService {
      private productRepository: Repository;

      constructor({ repository: productRepository }: { repository: Repository }) {
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
    }
  `,
};
