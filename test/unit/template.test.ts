import { expect, describe, jest, beforeEach, it } from "@jest/globals";

import templates from "./../../src/templates/index";
const { repositoryTemplate, serviceTemplate, factoryTemplate } = templates;

import {
  repositoryTemplateMock,
  serviceTemplateMock,
  factoryTemplateMock,
} from "./mocks/index";

describe("#CodeGenerator with 3 layers", () => {
  const componentName = "product";
  const repositoryName = `${componentName}Repository`;
  const serviceName = `${componentName}Service`;
  const factoryName = `${componentName}Factory`;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should generate a repository template", async () => {
    const expected = {
      fileName: repositoryName,
      template: repositoryTemplateMock,
    };

    const result = repositoryTemplate(componentName);

    expect(result).toStrictEqual(expected);
  });
  it("should generate a service template", async () => {
    const expected = {
      fileName: serviceName,
      template: serviceTemplateMock,
    };

    const result = serviceTemplate(componentName, repositoryName);
    console.log(result);
    console.log(expected);
    expect(result).toStrictEqual(expected);
  });
  it("should generate a factory template", async () => {
    const expected = {
      fileName: serviceName,
      template: factoryTemplateMock,
    };

    const result = factoryTemplate(componentName, repositoryName);
    console.log(result);
    console.log(expected);
    expect(result).toStrictEqual(expected);
  });
});
