interface ICreateLayersProps {
  mainPath: string;
  defaultMainFolder: string;
  layers: string[];
}

interface ICreateFilesProps {
  mainPath: string;
  defaultMainFolder: string;
  layers: string[];
  componentName: string;
}

interface IDependencies {
  repository: string[];
  service: string[];
  factory: string[];
}
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

export { ICreateLayersProps, ICreateFilesProps, IDependencies, ITemplates };
