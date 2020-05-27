module.exports = {
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true,
    node: true
  },
  plugins: ["babel", "vue", "prettier"],
  extends: [
    "plugin:vue/recommended", // use vue rules
    "eslint:recommended", // eslint default rules
    "prettier/vue", // vue formatting rules to prettier
    "plugin:prettier/recommended", // enables eslint-prettier interop,
    "plugin:cypress/recommended" // cypress
  ],
  rules: {
    "vue/order-in-components": [
      "warn",
      {
        order: [
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
      }
    ]
  }
};
