# P0 Setup

This project shows the bare-minimum setup for using typescript to develop
javascript applications which are bundled for the web.

## Commands

* `npm run build`
  * lint, type-check, and compile the source into the `lib` directory
* `npm run type-check`
  * type-check the source using the typescript compiler, do not emit any
    artifacts
* `npm run type-check:watch`
  * type-check the source automatically any time a file changes
* `npm run lint-fix`
  * run eslint with prettier and automatically fix any linting errors
* `npm run bundle`
  * lint and run webpack to transpile, minify, and aggregate the application
    into a single bundled js file for use in the browser

## Tools

The tools used for typescript transpilation and bundling are:

- babel
- tsc
- webpack

## Step By Step

Install node dependencies.

```powershell
# In a Powershell prompt

npm install --save-dev                    `
  typescript                              `
  @babel/core                             `
  @babel/cli                              `
  @babel/plugin-proposal-class-properties `
  @babel/preset-env                       `
  @babel/preset-typescript                `
  eslint                                  `
  @typescript-eslint/parser               `
  @typescript-eslint/eslint-plugin        `
  prettier                                `
  eslint-config-prettier                  `
  eslint-plugin-prettier
```

Setup typescript compiler options.

```powershell
tsc                              `
  --init                         `
  --declaration                  `
  --allowSyntheticDefaultImports `
  --target esnext                `
  --outDir lib
```

## Files

### `babel.config.json`

Configuration for Babel which transpiles typescript into browser-supported
javascript.

### `tsconfig.json`

Typescript compiler configuration which is used for typechecking and ide
autocompletion support.

### `webpack.config.js`

Configuration for the Webpack tool which is used to bundle all of the various
files and libraries into a single minified js file for use in the browser.

### `.eslintrc.js`

ESlint catches common antipaterns and mistakes to provides warnings. It
composes with prettier for source formatting.


