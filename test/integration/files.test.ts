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
import createFiles from "createFiles";
import createLayersIfNotExists from "createLayers";
import { ICreateFilesProps } from "../../src/@types/createLayers.types";
import Util from "../../src/util";

function getAllFunctionsFromInstance(instance: unknown) {
  return Reflect.ownKeys(Object.getPrototypeOf(instance)).filter(
    (method) => method !== "constructor"
  );
}
function generateFilePath({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}: ICreateFilesProps) {
  return layers.map((layer) => {
    const filename = `${componentName}${Util.upperCaseFirstLetter(layer)}.ts`;
    return join(mainPath, defaultMainFolder, layer, filename);
  });
}
describe("#Integration - Files - Files Structure", () => {
  const config = {
    defaultMainFolder: "src",
    mainPath: "",
    layers: ["service", "factory", "repository"].sort(),
    componentName: "test",
  };

  const packageJson = "package.json";
  const packageJsonLocation = join("./test/integration/mocks", packageJson);

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

    const [repositoryFile] = generateFilePath(myConfig);

    const { default: Repository } = await import(repositoryFile);

    const instance = new Repository();

    const expectNotImplemented = (fn: Function) =>
      expect(() => fn.call(instance)).rejects.toEqual("Not implemented");

    expectNotImplemented(instance.create);
    expectNotImplemented(instance.read);
    expectNotImplemented(instance.update);
    expectNotImplemented(instance.delete);
  });

  it("Service class should have create, read, update and delete methods and should call all Repository methods", async () => {
    const myConfig = {
      ...config,
      layers: ["repository", "service"],
    };

    await createFiles(myConfig);

    const [repositoryFile, serviceFile] = generateFilePath(myConfig);

    const { default: Repository } = await import(repositoryFile);

    const { default: Service } = await import(serviceFile);

    const repository = new Repository();
    const service = new Service({ repository });

    const allRepositoryMethods = getAllFunctionsFromInstance(repository);

    allRepositoryMethods.forEach((method) => {
      if (typeof method === "symbol") {
        // eslint-disable-next-line no-param-reassign
        method = method.toString();
      }
      jest.spyOn(repository, method).mockResolvedValue(null);
    });

    getAllFunctionsFromInstance(service).forEach((method) =>
      service[method].call(service, [])
    );

    allRepositoryMethods.forEach((method) =>
      expect(repository[method]).toHaveBeenCalled()
    );
  });

  // it("Factory instance should match layers", async () => {});
});
