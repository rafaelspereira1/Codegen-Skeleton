#!/usr/bin/env -S npx tsx

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import createLayersIfNotExists from "./createLayers";
import createFiles from "./createFiles";
import { IArguments } from "./@types/index.types";

const argv = yargs(hideBin(process.argv))
  .command("skeleton", "create project skeleton", (builder) =>
    builder
      .option("component-name", {
        alias: "c",
        demandOption: true,
        describe: "component's name",
        type: "array",
      })
      .example([
        [
          "skeleton --component-name product",
          "Create a single component named product",
        ],
        [
          "skeleton -c product -c category",
          "Create multiple components named product and category",
        ],
      ])
  )
  .epilog(
    "For more information, see https://github.com/rafaelspereira1/Codegen-Skeleton"
  ).argv as IArguments;

const componentName = argv["component-name"];

const env = process.env.NODE_ENV;
const defaultMainFolder = env === "dev" ? "tmp" : "src";

const layers = ["repository", "service", "factory"].sort();

const config = {
  layers,
  defaultMainFolder,
  mainPath: ".",
};

async function main() {
  await createLayersIfNotExists(config);

  const pendingPromises = (componentName as string[]).map((domain: string) =>
    createFiles({
      ...config,
      componentName: domain,
    })
  );

  await Promise.all(pendingPromises);
}

main().catch((error) => {
  console.error(error);
});
