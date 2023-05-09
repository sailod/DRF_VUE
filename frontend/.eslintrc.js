module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'ignore' },
    ],
    'comma-dangle': 'off',
    'vue/multi-word-component-names': 0,
  },
}
