import { expect, describe, jest, beforeEach, it } from "@jest/globals";
import createLayersIfNotExists from "createLayers";

import fsPromises from "fs/promises";
import fs from "fs";

describe("#Layers - Folder Structure", () => {
  const defaultLayers = ["service", "factory", "repository"];
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should create folders if it doesnt exists", async () => {
    jest.spyOn(fsPromises, "mkdir").mockResolvedValue(undefined);
    jest.spyOn(fs, "existsSync").mockReturnValue(false);

    await createLayersIfNotExists({
      mainPath: "",
      defaultMainFolder: "path",
      layers: defaultLayers,
    });

    expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
  });
  it("should not create folders if it exists", async () => {
    jest.spyOn(fsPromises, "mkdir").mockResolvedValue(undefined);
    jest.spyOn(fs, "existsSync").mockReturnValue(true);

    await createLayersIfNotExists({
      mainPath: "",
      defaultMainFolder: "path",
      layers: defaultLayers,
    });

    expect(fsPromises.mkdir).not.toHaveBeenCalled();
    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
  });
});
