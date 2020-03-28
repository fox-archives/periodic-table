module.exports = {
  parser: "babel-eslint",
  env: {
    node: true
  },
  plugins: ["babel", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:jest/recommended"
  ]
};
