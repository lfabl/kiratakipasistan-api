module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    parserOptions: {
      parser: 'babel-eslint'
    },
    extends: [
      '@nuxtjs',
      'prettier',
      'plugin:prettier/recommended'
    ],
    plugins: [
      'prettier'
    ],
    rules: {
      "no-console": "off",
      "no-debugger": "off",
      "prettier/prettier": ["error", {
        "endOfLine": "auto"
      }],
    }
  }
  