import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Cell } from '../src/cell';

describe('a single cell', function () {
  it('the rows and columns should be accurate', function () {
    const column = 2;
    const row = 1;
    const cell = new Cell(column, row);

    expect(cell.row).to.equal(
      row,
      "the cell's row should match the provided row",
    );
    expect(cell.column).to.equal(
      column,
      "the cell's column should match the provided column",
    );
  });

  it('should have no neighbors when initially created', function () {
    const cell = new Cell(1, 1);
    expect(cell.neighbors()).to.be.empty;
  });

  it("should know about it's neighbors", function () {
    const cell = new Cell(1, 1);
    const west = new Cell(0, 1);
    const south = new Cell(1, 2);

    cell.west = west;
    cell.south = south;

    expect(cell.neighbors()).to.have.lengthOf(
      2,
      'only two neighbors should be listed',
    );
    expect(cell.neighbors()).to.include(
      west,
      'the west neighbor should be included',
    );
    expect(cell.neighbors()).to.include(
      south,
      'the south neighbor should be included',
    );
  });

  it('should support bidirectional linking', function () {
    const cell = new Cell(1, 1);
    const target = new Cell(1, 2);

    cell.link(target);

    expect(cell.is_linked(target), 'cell is linked to target').to.be.true;
    expect(target.is_linked(cell), 'target is linked to cell').to.be.true;

    cell.unlink(target);

    expect(cell.is_linked(target), 'cell is not linked to target').to.be.false;
    expect(target.is_linked(cell), 'target is not linked to cell').to.be.false;
  });

  it('should support one-way linking', function () {
    const cell = new Cell(1, 1);
    const target = new Cell(1, 2);

    cell.link(target, 'Directional');

    expect(cell.is_linked(target), 'cell is linked to target').to.be.true;
    expect(target.is_linked(cell), 'target is not linked to cell').to.be.false;

    cell.unlink(target);

    expect(cell.is_linked(target), 'cell is not linked to target').to.be.false;
  });

  it('should support one-way unlinking', function () {
    const cell = new Cell(1, 1);
    const target = new Cell(1, 2);

    cell.link(target);
    target.unlink(cell, 'Directional');

    expect(
      cell.is_linked(target),
      'the original direction should not be modified',
    ).to.be.true;

    expect(
      target.is_linked(cell),
      'the unlinked direction should be, well, unlinked',
    ).to.be.false;
  });
});
