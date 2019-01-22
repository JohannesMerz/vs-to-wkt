module.exports = {
  env: {
    es6: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': 'off',
    'no-unused-expressions': ['error', { allowTernary: true, allowTaggedTemplates: true }],
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-use-before-define': ['error', 'nofunc'],
    radix: ['error', 'as-needed'],
    'react/jsx-one-expression-per-line': 0,
    'react/button-has-type': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 'off',
  },
  globals: {},
};
