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

export const compileESM = (pkg: string) =>
  sequence(
    assert(pkg, 'Package directory is required! e.g. "packages/start1"') as any,
    env({ NODE_ENV: "production" }) as any,
    find(`${pkg}/src/**/*.ts`) as any,
    read as any,
    babel({ sourceMaps: true }),
    rename(file => file.replace(/\.ts(x?)$/, ".js")) as any,
    write(`${pkg}/esm/`) as any
  );

export const compileCJS = (pkg: string) =>
  sequence(
    assert(pkg, 'Package directory is required! e.g. "packages/start1"') as any,
    env({ NODE_ENV: "production" }) as any,
    find(`${pkg}/src/**/*.ts`) as any,
    read as any,
    babel({ envName: "cjs", sourceMaps: true }),
    rename(file => file.replace(/\.ts(x?)$/, ".js")) as any,
    write(`${pkg}/cjs/`) as any
  );

export const compile = (pkg: string) =>
  parallel(["compileESM", "compileCJS"], {maxProcesses: 2})(pkg);

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
