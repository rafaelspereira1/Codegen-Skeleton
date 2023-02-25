/* eslint-disable import/prefer-default-export */
interface ITemplates {
  [key: string]: (componentName: string, repositoryName?: string, serviceName?: string) => Template;
  repositoryTemplate: (componentName: string) => Template;
  serviceTemplate: (componentName: string, repositoryName: string) => Template;
  factoryTemplate: (componentName: string, serviceName: string) => Template;
}

interface Template {
  fileName: string
  template: string
}

export { ITemplates }
