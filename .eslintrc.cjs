module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 8,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-new': 0,
    'eol-last': 0,
    'comma-dangle': 0
  }
}