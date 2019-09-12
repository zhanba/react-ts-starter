# React Typescript starter

[![Build Status](https://zhanba.visualstudio.com/github/_apis/build/status/zhanba.react-ts-starter?branchName=master)](https://zhanba.visualstudio.com/github/_build/latest?definitionId=1&branchName=master)

## Feature

- React 16 /redux 4 /redux-saga /React-Router 4
- Typescript / Babel 7
- Webpack 4 (config file also in ts)
- CSSModules / LESS
- TsLint / prettier (with vscode config to intergrate all tools)
- Antd + custom theme file
- Nodemon to restart webpack when you change config file
- no package-lock.json (if you want lock file, delete .npmrc)

## Usage

```js
npm install
npm start
```

## TODO

- test
- storybook!
- reduce dep

downgrade webpack to 4.28 for https://github.com/webpack/webpack/issues/8656
