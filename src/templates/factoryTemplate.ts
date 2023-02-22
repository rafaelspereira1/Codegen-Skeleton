import Util from "../util";
const componentNameAnchor = "$$componentName";
const currentContextAnchor = "$$currentContext";
const repositoryAnchor = "$$repositoryName";
const template = `
import ProductService from "../service/ProductService";
import ProductRepository from "../service/ProductRepository";

export default class ProductFactory {
    static getInstance() {
      const repository = new ProductRepository();
      const service = new ProductService({ repository });
      return service;
    }
  }`;

export default function factoryTemplate(
  componentName: string,
  repositoryName: string,
  serviceName: string
) {
  const currentContext = `this.${repositoryName}`;
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(currentContextAnchor, currentContext)
    .replaceAll(repositoryAnchor, repositoryName);
  return {
    fileName: `${componentName}Service`,
    template,
  };
}
