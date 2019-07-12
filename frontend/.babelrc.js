module.exports = {
  "presets": [
    "@babel/env"
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-object-rest-spread",
      {
        "useBuiltIns": true
      }
    ],
    "@babel/plugin-syntax-dynamic-import"
  ]
};
