import { Grid } from './grid';
import p5 from 'p5';

/** Render a grid to a p5 canvas */
export function graphical_view(grid: Grid, sketch: p5): void {
  const max_cells = Math.max(grid.rows, grid.columns);
  const computed_width = sketch.width / max_cells / 20;

  const line_width = Math.max(1, Math.floor(computed_width));
  const half_width = line_width * 0.5;
  sketch.strokeWeight(line_width);

  const cell_width = (sketch.width - line_width) / grid.columns;
  const cell_height = (sketch.height - line_width) / grid.rows;

  grid.each_cell((cell) => {
    const left = half_width + (cell.column - 1) * cell_width;
    const right = half_width + cell.column * cell_width;
    const top = half_width + (cell.row - 1) * cell_height;
    const bottom = half_width + cell.row * cell_height;

    if (cell.north === null) {
      sketch.line(left, top, right, top);
    }
    if (cell.west === null) {
      sketch.line(left, top, left, bottom);
    }

    if (!cell.is_linked(cell.east)) {
      sketch.line(right, top, right, bottom);
    }
    if (!cell.is_linked(cell.south)) {
      sketch.line(left, bottom, right, bottom);
    }
  });
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
