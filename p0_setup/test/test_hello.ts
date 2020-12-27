import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { hello } from '../src/index';
import * as util from 'util';

/**
 * Replace console.log with a function which catpures the arguments instead.
 */
function capture_console_log(): string[] {
  const lines: string[] = [];
  const original = console.log;

  before(() => {
    lines.length = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log = (...args: any) => {
      const line = util.format(...args);
      lines.push(line);
    };
  });

  after(() => {
    console.log = original;
  });

  return lines;
}

describe('example of using mocha', () => {
  const lines = capture_console_log();

  it('should verify a thing', () => {
    // calling hello should not throw
    hello('world');

    expect(lines).to.have.lengthOf(1, 'only one line should be logged');
  });
});
