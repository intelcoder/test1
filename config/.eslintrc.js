var path = require('path')
var CWD = process.cwd()

module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "globals": {
    "document": true,
    "window": true,
    "google": true,
    "localStorage": true,
    "URL": true,
    "Image": true,
    "navigator": true,
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-nested-ternary": 0,
    "semi": ["error", "never"],
    "default-case": 0,
    "prefer-template": 0,
    "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
    "arrow-parens": 0,
    "react/jsx-no-bind": 0,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0, //Using alias throwing error,
    "import/no-unresolved": 0,
    "react/require-default-props": 0,
    "react/no-string-refs": 0,
    "class-methods-use-this": 0,
    "quote-props": ["error", "consistent"],
    "arrow-body-style": ["error", "as-needed"],
    "jsx-a11y/no-static-element-interactions": 0, //we do not use roles,
    "max-len": [2, {"code": 120}],
    "no-case-declarations": 0,
    "no-underscore-dangle": 0,
    "space-after-keywords": 0,
    "space-before-keywords": 0,
    "import/no-dynamic-require": 0,
    "import/prefer-default-export": 0,
    "consistent-return": 0,
    "keyword-spacing": ["error", { "overrides": {
      "if": { "after": false },
      "for": { "after": false },
      "while": { "after": false },
      "switch": { "after": false }
    } }]
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        'Components': path.resolve(CWD, './react/components/'),
        'Containers': path.resolve(CWD, './react/containers/'),
        'Defaults': path.resolve(CWD, './react/defaults/'),
        'Utils': path.resolve(CWD, './react/utils'),
        'Layout': path.resolve(CWD, './react/containers/layout/'),
        'Pages': path.resolve(CWD, './react/containers/pages'),
        'Root': path.resolve(CWD, './react/containers/root'),
        'Redux': path.resolve(CWD, './react/redux/'),
        'Actions': path.resolve(CWD, './react/redux/actions'),
        'Modules': path.resolve(CWD, './react/redux/modules'),
        'Services': path.resolve(CWD, './react/redux/services'),
      }
    }
  }
}
