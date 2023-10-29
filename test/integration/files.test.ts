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
import createFiles from "createFiles";

async function getFolders({
  mainPath,
  defaultMainFolder,
}: {
  mainPath: string;
  defaultMainFolder: string;
}): Promise<string[]> {
  return fsPromises.readdir(join(mainPath, defaultMainFolder));
}

describe("#Integration - Files - Files Structure", () => {
  const config = {
    defaultMainFolder: "src",
    mainPath: "",
    layers: ["service", "factory", "repository"].sort(),
    componentName: "test",
  };

  const packageJson = "package.json";
  const packageJsonLocation = join("./test/integration/mocks");

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "files-"));
    await fsPromises.copyFile(
      packageJsonLocation,
      join(config.mainPath, packageJson)
    );
    await createLayersIfNotExists(config);
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("Repository class should have create, read, update and delete methods", async () => {
    const myConfig = {
      ...config,
      layers: ["repository"],
    };

    await createFiles(myConfig);
  });
  it("Service class should have create, read, update and delete methods and should call all Repository methods", async () => {});
  it("Factory instance should match layers", async () => {});
});
