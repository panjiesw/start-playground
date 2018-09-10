# start-playground

A monorepo to play around with [start](https://github.com/deepsweet/start).

## Notable Dev Packages

* babel families v7.0.0
* typescript@3.0.3
* start families, cli@0.3.1
* lerna@3.3.0
* npm-run-all@4.1.3

## Build

The sub-packages sources are taken from [TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter), copied over until there are 10 sub-packages with the exact same sources. It's to simulate a somewhat big monorepo.

The goal is to build all sub-packages written in TypeScript (v3.0.3) using `babel@7.0.0`.

There are two variations to build all the sub-packages:

* Using `lerna run --parallel`, which run npm scripts in each package (also with help of [npm-run-all](https://github.com/mysticatea/npm-run-all) `run-p`)

  ```bash
  # from root package
  npm run build:npm
  ```

* Using `start compileAll` from the root package

  ```bash
  # from root package
  npm run build:start
  ```

## Comparison

Machine spec:

* OS: **Arch Linux X64**
* RAM: **16GB**
* CPU: **i7 6700HQ**
* DISK: **SSD 256GB**

Using gnu time `/usr/bin/time`.

* Using `lerna run`

  ```bash
  time npm run build:npm
    Command being timed: "npm run build:npm"
    User time (seconds): 56.50
    System time (seconds): 2.91
    Percent of CPU this job got: 694%
    Elapsed (wall clock) time (h:mm:ss or m:ss): 0:08.55
    Average shared text size (kbytes): 0
    Average unshared data size (kbytes): 0
    Average stack size (kbytes): 0
    Average total size (kbytes): 0
    Maximum resident set size (kbytes): 90924
    Average resident set size (kbytes): 0
    Major (requiring I/O) page faults: 0
    Minor (reclaiming a frame) page faults: 720474
    Voluntary context switches: 39600
    Involuntary context switches: 44971
    Swaps: 0
    File system inputs: 0
    File system outputs: 10488
    Socket messages sent: 0
    Socket messages received: 0
    Signals delivered: 0
    Page size (bytes): 4096
    Exit status: 0
  ```

* Using `start compileAll`

  ```bash
  time npm run build:start
    Command being timed: "npm run build:start"
    User time (seconds): 128.51
    System time (seconds): 4.78
    Percent of CPU this job got: 720%
    Elapsed (wall clock) time (h:mm:ss or m:ss): 0:18.49
    Average shared text size (kbytes): 0
    Average unshared data size (kbytes): 0
    Average stack size (kbytes): 0
    Average total size (kbytes): 0
    Maximum resident set size (kbytes): 147804
    Average resident set size (kbytes): 0
    Major (requiring I/O) page faults: 0
    Minor (reclaiming a frame) page faults: 1001942
    Voluntary context switches: 41396
    Involuntary context switches: 53945
    Swaps: 0
    File system inputs: 0
    File system outputs: 13672
    Socket messages sent: 0
    Socket messages received: 0
    Signals delivered: 0
    Page size (bytes): 4096
    Exit status: 0
  ```

Overall `start` consumes more resources than just running NPM scripts in parallel
using `lerna run` + `npm-run-all` stanza.
