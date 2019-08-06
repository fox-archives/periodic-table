module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    'babel',
    'vue',
    'prettier'
  ],
  extends: [
    'plugin:vue/recommended', // use vue rules
    'eslint:recommended', // eslint default rules
    'prettier/vue', // vue formatting rules to prettier
    'plugin:prettier/recommended', // enables eslint-prettier interop
  ],
  rules: {
    'vue/order-in-components': ['warn', {
      'order': [
        "el",
        "name",
        ["props", "propsData"],
        "mixins",
        "data",
        "watch",
        "LIFECYCLE_HOOKS",
        "computed",
        "methods"
      ]
    }]
  }
};
