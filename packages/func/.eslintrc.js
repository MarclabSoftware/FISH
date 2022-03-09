module.exports = {
  extends: './node_modules/gts/',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
  },
};
