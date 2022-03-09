# FISH

FISH - Free Intergration for Smart Home by Marclab Software

## Development

### Getting started with Google Actions for Smarthome

See [this codelab](https://developers.google.com/codelabs/smarthome-washer) from Google to grasp
the basic concepts behind Google Smarthome Actions.

### Requirements

You must have:

- node 16+
- pnpm (to install it: `npm i -g pnpm`)

### Repo structure

This is a monorepo. Each part of the FISH system is split in modules (or packages) managed using
pnpm. Each package is under the "packages/\<package-name\>" folder.

If you want to run npm scripts for a specific package from the root folder, you can run:

```bash
pnpm run:<package-name> <npm script name here>
```

e.g.

```bash
pnpm run:func lint
```

Also note that each package has its own readme for development/technical documentation, direct
links here:

- [func README](packages/func/README.md)