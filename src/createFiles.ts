import fsPromises from "fs/promises";
import templates from "templates/index";
import Util from "./util";
import { ICreateFilesProps, IDependencies } from "./@types/createLayers.types";

const defaultDepedencies = (
  layer: keyof IDependencies,
  componentName: string
): string[] => {
  const dependencies: IDependencies = {
    repository: [],
    service: [`${componentName}Repository`],
    factory: [`${componentName}Repository`, `${componentName}Service`],
  };
  return dependencies[layer].map(Util.lowerCaseFirstLetter);
};
async function executeWrites(
  PendingFilesToWrite: { fileNamePath: string; txtFile: string }[]
): Promise<void> {
  await Promise.all(
    PendingFilesToWrite.map(({ fileNamePath, txtFile }) =>
      fsPromises.writeFile(fileNamePath, txtFile)
    )
  );
}

export default async function createFiles({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}: ICreateFilesProps) {
  const keys = Object.keys(templates);

  const PendingFilesToWrite: {
    fileNamePath: string;
    txtFile: string;
  }[] = [];

  layers.forEach((layer) => {
    const chosenTemplate = keys.find((key) => key.includes(layer));
    if (!chosenTemplate) {
      throw new Error(`Template not found for layer "${layer}"`);
    }

    // @ts-ignore
    const template = templates[chosenTemplate];

    // exemple: /users/documents/username/codegen/src/factory
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`;
    // @ts-ignore
    const depedencies = defaultDepedencies(layer, componentName);

    const { fileName, template: txtFile } = template(
      componentName,
      ...depedencies
    );

    const fileNamePath = `${targetFolder}/${Util.lowerCaseFirstLetter(
      fileName
    )}.ts`;

    PendingFilesToWrite.push({ fileNamePath, txtFile });
  });

  await executeWrites(PendingFilesToWrite);

  return { sucess: true };
}
