import assert from "@start/plugin-assert";
import babel from "@start/plugin-lib-babel";
import find from "@start/plugin-find";
import env from "@start/plugin-env";
import parallel from "@start/plugin-parallel";
import read from "@start/plugin-read";
import rename from "@start/plugin-rename";
import sequence from "@start/plugin-sequence";
import write from "@start/plugin-write";
import xargs from "@start/plugin-xargs";

export const compileESM = pkg =>
  sequence(
    assert(pkg, 'Package directory is required! e.g. "packages/start1"'),
    env({ NODE_ENV: "production" }),
    find(`${pkg}/src/**/*.ts`),
    read,
    babel({ sourceMaps: true }),
    rename(file => file.replace(/\.ts(x?)$/, ".js")),
    write(`${pkg}/esm/`)
  );

export const compileCJS = pkg =>
  sequence(
    assert(pkg, 'Package directory is required! e.g. "packages/start1"'),
    env({ NODE_ENV: "production" }),
    find(`${pkg}/src/**/*.ts`),
    read,
    babel({ envName: "cjs", sourceMaps: true }),
    rename(file => file.replace(/\.ts(x?)$/, ".js")),
    write(`${pkg}/cjs/`)
  );

export const compile = pkg =>
  parallel(["compileESM", "compileCJS"], { maxProcesses: 2 })(pkg);

export const compileAll = () =>
  xargs("compile", { maxProcesses: 4 })(
    "packages/start1",
    "packages/start2",
    "packages/start3",
    "packages/start4",
    "packages/start5",
    "packages/start6",
    "packages/start7",
    "packages/start8",
    "packages/start9",
    "packages/start10"
  );
