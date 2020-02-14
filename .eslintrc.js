module.exports = {
  "env": {
    "window": true,
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "Taro",
  ],
  "globals": {
    "wx": "readonly",
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true,
    "project": "./tsconfig.json"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "settings": {
    "react": {
      "createClass": "createReactClass",
      "pragma": "React",
      "version": "detect",
      "flowVersion": "0.53"
    }
  },
  "rules": {
    "no-useless-return": "error", // 不使用多余的return
    "no-console": "allow",
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "Config"
      }
    ],
    "react/react-in-jsx-scope": 0, // 避免Taro中使用 React 写成 react 产生的报错
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx",
          ".tsx"
        ]
      }
    ]
  }
};
