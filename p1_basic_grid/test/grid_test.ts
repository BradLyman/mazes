import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Grid } from '../src/grid';

describe('a grid of cells', function () {
  it('should have known rows and columns', function () {
    const rows = 4;
    const columns = 8;
    const grid = new Grid(columns, rows);

    expect(grid.rows).to.equal(
      rows,
      'the grid should have the configured number of rows',
    );

    expect(grid.columns).to.equal(
      columns,
      'the grid should have the configured number of columns',
    );
  });

  describe("should link each cell to it's neighbors", function () {
    const grid = new Grid(3, 3);

    grid.each_cell((cell) => {
      const row = cell.row;
      const column = cell.column;

      it(`cell ${column}:${row}`, () => {
        let expected_neighbors = 4;
        if (column === 1 || column === grid.columns) expected_neighbors--;
        if (row === 1 || row === grid.rows) expected_neighbors--;

        expect(
          cell.neighbors(),
          `cell should have ${expected_neighbors} neighbors`,
        ).lengthOf(expected_neighbors);

        if (row === 1) {
          expect(cell.north, "shouldn't have a north neighbor").to.be.null;
        } else {
          expect(cell.north, 'should have a north neighbor').to.exist.and.equal(
            grid.get(column, row - 1),
          );
        }

        if (row === grid.rows) {
          expect(cell.south, "shouldn't have a south neighbor").to.be.null;
        } else {
          expect(cell.south, 'should have a south neighbor').to.exist.and.equal(
            grid.get(column, row + 1),
          );
        }

        if (column === 1) {
          expect(cell.west, "shouldn't have a west neighbor").to.be.null;
        } else {
          expect(cell.west, 'should have an west neighbor').to.exist.and.equal(
            grid.get(column - 1, row),
          );
        }

        if (column === grid.columns) {
          expect(cell.east, "shouldn't have an east neighbor").to.be.null;
        } else {
          expect(cell.east, 'should have an east neighbor').to.exist.and.equal(
            grid.get(column + 1, row),
          );
        }
      });
    });
  });
});
