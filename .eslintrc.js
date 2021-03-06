module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'eslint:recommended',
    'react-app',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:testcafe/recommended',
  ],
  plugins: ['react-hooks', 'testcafe', 'standard'],
  rules: {
    'react/prop-types': 0,
    'react/no-access-state-in-setstate': 'error',
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    'space-before-function-paren': 0,
    indent: 0,
    'react-hooks/rules-of-hooks': 'error',
    'jsx-a11y/aria-role': [
      2,
      {
        ignoreNonDOM: true,
      },
    ],
  },
  env: {
    jest: true,
    browser: true,
  },
  settings: {
    react: {
      version: '16.0',
    },
  },
};
