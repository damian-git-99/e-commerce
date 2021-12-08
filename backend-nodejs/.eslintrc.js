module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    semi: [2, 'always'],
    'space-before-function-paren': 'off'
  }
};
