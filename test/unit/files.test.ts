import templates from "templates";
import { expect, describe, jest, it } from "@jest/globals";
import createFiles from "createFiles";

import fsPromises from "fs/promises";

describe("#Files - Folder Structure", () => {
  const defaultLayers = ["service", "factory", "repository"];
  const config = {
    layers: defaultLayers,
    mainPath: "./",
    defaultMainFolder: "src",
    componentName: "test",
  };

  const repositoryLayer = `${config.componentName}Repository`;
  const serviceLayer = `${config.componentName}Service`;

  it("should not create a file structure if the template do not exist", async () => {
    const myConfig = {
      ...config,
      layers: ["inexistent"],
    };

    const expectedErrorMessage = `Template not found for layer "inexistent"`;

    try {
      await createFiles(myConfig);
    } catch (error) {
      expect(error.message).toEqual(expectedErrorMessage);
    }
  });
  it("repository should not have any additional dependencies", async () => {
    jest
      .spyOn(fsPromises, "writeFile")
      .mockImplementation(() => Promise.resolve());
    jest.spyOn(templates, "repositoryTemplate").mockReturnValue({
      fileName: "",
      template: "",
    });

    const myConfig = {
      ...config,
      layers: ["repository"],
    };

    const expected = { sucess: true };

    const result = await createFiles(myConfig);

    expect(result).toEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName
    );
  });
  it("service should have repository as a depedency", async () => {
    jest
      .spyOn(fsPromises, "writeFile")
      .mockImplementation(() => Promise.resolve());
    jest.spyOn(templates, "serviceTemplate").mockReturnValue({
      fileName: "",
      template: "",
    });

    const myConfig = {
      ...config,
      layers: ["repository", "service"],
    };

    const expected = { sucess: true };

    const result = await createFiles(myConfig);

    expect(result).toEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.serviceTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryLayer
    );
  });
  it("factory should have repository and service as dependencies", async () => {
    jest
      .spyOn(fsPromises, "writeFile")
      .mockImplementation(() => Promise.resolve());
    jest.spyOn(templates, "factoryTemplate").mockReturnValue({
      fileName: "",
      template: "",
    });

    const myConfig = {
      ...config,
    };

    const expected = { sucess: true };

    const result = await createFiles(myConfig);

    expect(result).toEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.factoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryLayer,
      serviceLayer
    );
  });
});
