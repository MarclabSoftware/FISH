# FISH

FISH - Free Intergration for Smart Home by Marclab Software

## Development

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
