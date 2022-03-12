# :fish:FISH

FISH - Free Integration for Smart Homes by Marclab Software

## Development

### Getting started with Google Actions for Smarthome

See [this codelab](https://developers.google.com/codelabs/smarthome-washer) from Google to grasp
the basic concepts behind Google Smarthome Actions.

### Requirements

You must have:

- node 16.10+
- corepack enabled (to enable run `corepack enable`).

  :information_source: corepack should come bundled with nodejs 16.10+, if not, run `npm i -g corepack`.

### Repo structure

This is a monorepo. Each part of the FISH system is split in modules (or packages) managed using
yarn workspaces. Workspaces are located in these folders:

- **Shared libraries** are located under `packages/<package-name>` folders
- **Google Cloud Functions** code is under `functions` folder.

If you want to run npm scripts for a specific package from the root folder, you can run:

```shell
yarn workspace <package-name> <npm script name here>
```

e.g.

```shell
yarn workspace @marclabsoftware/fish-func run lint
```

:information_source: Each package has its own readme for development/technical documentation, direct
links here:

- [functions README](functions/README.md)
