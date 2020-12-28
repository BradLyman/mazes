# P1 Basic Grid

This project establishes the Grid and Cell abstractions which will be used for
maze construction and presentation.

## How To Use

1. `npm install --also=dev` to get all of the development dependencies.
2. `npm run bundle` to prepare the web bundle
3. open `dist/index.html` in a browser

The dist demo just present a text grid in a centered preformatted square.

## Commands

* `npm run build`
** lint, type-check, and compile the source into the `lib` directory
* `npm run type-check`
** type-check the source using the typescript compiler, do not emit any
   artifacts
* `npm run type-check:watch`
** type-check the source automatically any time a file changes
* `npm run lint-fix`
** run eslint with prettier and automatically fix any linting errors
* `npm run bundle`
** lint and run webpack to transpile, minify, and aggregate the application
   into a single bundled js file for use in the browser

