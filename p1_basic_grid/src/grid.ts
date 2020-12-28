import { Cell } from './cell';

/**
 * A 2-d grid of cells.
 */
export class Grid {
  public readonly rows: number;
  public readonly columns: number;

  private grid: Cell[][];

  constructor(columns: number, rows: number) {
    this.rows = rows;
    this.columns = columns;

    this.grid = this.build_grid();
    this.configure_grid();
  }

  protected build_grid(): Cell[][] {
    const cells: Cell[][] = [];
    for (let column = 1; column <= this.columns; column++) {
      const column_cells = [];
      for (let row = 1; row <= this.rows; row++) {
        column_cells.push(new Cell(column, row));
      }
      cells.push(column_cells);
    }
    return cells;
  }

  protected configure_grid(): void {
    this.each_cell((cell) => {
      cell.north = this.get(cell.column, cell.row - 1);
      cell.south = this.get(cell.column, cell.row + 1);
      cell.west = this.get(cell.column - 1, cell.row);
      cell.east = this.get(cell.column + 1, cell.row);
    });
  }

  /**
   * Fetch a single cell from the grid.
   *
   * Rows and columns are 1-indexed. Missing values yield as nulls.
   */
  public get(column: number, row: number): Cell | null {
    if (column < 1 || column > this.columns) return null;
    if (row < 1 || row > this.rows) return null;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.grid[column - 1]![row - 1]!;
  }

  /**
   * Apply a function to each cell in the grid.
   */
  each_cell(fctn: (cell: Cell) => void): void {
    this.each_column((column) => {
      for (const cell of column) {
        fctn(cell);
      }
    });
  }

  /**
   * Apply a function to each column in the grid.
   */
  each_column(fctn: (column: Cell[]) => void): void {
    for (const column of this.grid) {
      fctn(column);
    }
  }
}

/** Return a preformatted view of the grid as text. */
export function text_view(grid: Grid): string {
  let output = '+' + '---+'.repeat(grid.columns) + '\n';

  for (let row = 1; row <= grid.rows; row++) {
    let center = '|';
    let bottom = '+';
    for (let column = 1; column <= grid.columns; column++) {
      const cell = grid.get(column, row) ?? new Cell(-1, -1);
      const east_boundary = cell.is_linked(cell.east) ? ' ' : '|';
      center += '   ' + east_boundary;

      const south_boundary = cell.is_linked(cell.south) ? '   ' : '---';
      bottom += south_boundary + '+';
    }

    output += center + '\n';
    output += bottom + '\n';
  }

  return output;
}
