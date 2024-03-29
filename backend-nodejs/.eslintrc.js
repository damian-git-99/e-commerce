module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    semi: [2, 'always'],
    indent: ['error', 2],
    'space-before-function-paren': 'off'
  }
};
