import Util from "../util";

const componentNameAnchor = "$$componentName";
const currentContextAnchor = "$$currentContext";
const repositoryAnchor = "$$repositoryName";
const template = `
export default class $$componentNameService {
  constructor({ repository: $$repositoryName }) {
    $$currentContext = $$repositoryName;
  }

  create(data: string) {
    return $$currentContext.create(data);
  }

  read(query: string) {
    return $$currentContext.read(query);
  }

  update(id: number, data: string) {
    return $$currentContext.update(id, data);
  }

  delete(id: number) {
    return $$currentContext.delete(id);
  }
}`;

export default function serviceTemplate(
  componentName: string,
  repositoryName: string
) {
  const currentContext = `this.${repositoryName}`;
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(currentContextAnchor, currentContext)
    .replaceAll(repositoryAnchor, repositoryName);
  return {
    fileName: `${componentName}Service`,
    template: txtFile,
  };
}
