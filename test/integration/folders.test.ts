import {
  expect,
  describe,
  jest,
  beforeEach,
  beforeAll,
  afterAll,
  it,
} from "@jest/globals";

import { tmpdir } from "os";
import fsPromises from "fs/promises";
import { join } from "path";
import createLayersIfNotExists from "createLayers";

async function getFolders({
  mainPath,
  defaultMainFolder,
}: {
  mainPath: string;
  defaultMainFolder: string;
}): Promise<string[]> {
  return fsPromises.readdir(join(mainPath, defaultMainFolder));
}
describe("#Integration - Layers - Folders Structure", () => {
  const config = {
    defaultMainFolder: "src",
    mainPath: "",
    layers: ["service", "factory", "repository"].sort(),
  };

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "skeleton-"));
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should not create folders if it exists", async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath);

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(beforeRun).not.toStrictEqual(afterRun);
    expect(afterRun).toEqual(config.layers);
  });

  /*
 TODO: Refactor this test, at the moment this is dependent on the previous test to be runned
  */
  it("should create folders if it doesnt exists", async () => {
    const beforeRun = await getFolders(config);

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(afterRun).toEqual(beforeRun);
  });
});
