import fsPromises from "fs/promises";
import fs from "fs";
import { ICreateLayersProps } from "./@types/createLayers.types";

export default async function createLayersIfNotExists({
  mainPath,
  defaultMainFolder,
  layers,
}: ICreateLayersProps) {
  const defaultPath = `${mainPath}/${defaultMainFolder}`;

  const foldersToCreate = layers.filter((layer) => !fs.existsSync(layer));

  const results = foldersToCreate.map(
    (folder) => fsPromises.mkdir(`${defaultPath}/${folder}`),
    { recursive: true }
  );

  return Promise.all(results);
}
