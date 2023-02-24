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

export { ICreateLayersProps, ICreateFilesProps, IDependencies };
