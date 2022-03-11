module.exports = {
  extends: './node_modules/gts/',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        printWidth: 100,
      },
    ],
  },
};
