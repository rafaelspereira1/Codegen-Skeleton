import Util from "../util";

const componentNameAnchor = "$$componentName";

const template = `
export default class $$componentNameRepository {
  constructor() {}

  create(data: string) {
    return Promise.reject("Not implemented");
  }

  read(query: string) {
    return Promise.reject("Not implemented");
  }

  update(id: number, data: string) {
    return Promise.reject("Not implemented");
  }

  delete(id: number) {
    return Promise.reject("Not implemented");
  }
}`;

export default function repositoryTemplate(componentName: string) {
  return {
    fileName: `${componentName}Repository`,
    template: template.replaceAll(
      componentNameAnchor,
      Util.upperCaseFirstLetter(componentName)
    ),
  };
}
