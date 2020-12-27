/**
 * This file is required to make babel, typescript, and mocha all play nicely.
 *
 * The problem is that the @babel/register library does not know to look at
 * the extensions specified on the command line. There's an open issue to
 * resolve this bug, but in the meantime this file fixes things.
 *
 * https://github.com/babel/babel/issues/8962
 */

const register = require('@babel/register').default;

register({ extensions: ['.ts', '.tsx', '.js', '.jsx'] });
