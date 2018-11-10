
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  globals: {
    env: false
  },
  env: {
    browser: true,
    node: true
  },
  //  https:// github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  //  required to lint *.vue files
  plugins: [
    'vue',
    'html'
  ],
  //  add your custom rules here
  rules: {
  }
}
