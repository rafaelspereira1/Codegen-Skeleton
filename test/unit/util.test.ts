import { expect, describe, jest, beforeEach, it } from "@jest/globals";
import Util from "../../src/util";

describe("Util - Strings", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("upperCaseFirstLetter should transform the first letter in upperCase", async () => {
    const str = "hello";
    const result = Util.upperCaseFirstLetter(str);
    expect(result).toBe("Hello");
  });
  it("lowerCaseFirstLetter should transform the first letter in lowerCase", async () => {
    const str = "Hello";
    const result = Util.lowerCaseFirstLetter(str);
    expect(result).toBe("hello");
  });
  it("lowerCaseFirstLetter given an empty string should return empty", async () => {
    const str = "";
    const result = Util.lowerCaseFirstLetter(str);
    expect(result).toBe("");
  });
  it("upperCaseFirstLetter given an empty string should return empty", async () => {
    const str = "";
    const result = Util.upperCaseFirstLetter(str);
    expect(result).toBe("");
  });
});
