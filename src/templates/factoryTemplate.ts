import Util from "../util";

const serviceNameAnchor = "$$serviceName";
const repositoryNameAnchor = "$$repositoryName";
const componentNameAnchor = "$$componentName";

const serviceNameDepAnchor = "$$serviceNameDep";
const repositoryNameDepAnchor = "$$repositoryNameDep";

const template = `
import $$serviceName from "../service/$$serviceNameDep;
import $$repositoryName from "../service/$$repositoryNameDep";

export default class $$componentNameFactory {
    static getInstance() { 
      const repository = new $$repositoryName();
      const service = new $$serviceName({ repository });
      return service;
    }
  }`;

export default function factoryTemplate(
  componentName: string,
  repositoryName: string,
  serviceName: string
) {
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName))
    .replaceAll(
      repositoryNameDepAnchor,
      Util.lowerCaseFirstLetter(repositoryName)
    )
    .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
    .replaceAll(
      repositoryNameAnchor,
      Util.upperCaseFirstLetter(repositoryName)
    );
  return {
    fileName: `${componentName}Factory`,
    template: txtFile,
  };
}
