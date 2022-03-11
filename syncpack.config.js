module.exports = {
  dev: true,
  filter: '.',
  indent: '  ',
  overrides: true,
  peer: true,
  prod: true,
  resolutions: true,
  semverGroups: [],
  semverRange: '',
  sortAz: [
    'contributors',
    'dependencies',
    'devDependencies',
    'keywords',
    'peerDependencies',
    'scripts',
  ],
  sortFirst: ['name', 'description', 'version', 'author'],
  source: ['package.json', 'functions/package.json', 'packages/*/package.json'],
  versionGroups: [],
};
