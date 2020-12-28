import { Grid } from '../grid';

export function binary_tree(grid: Grid): void {
  grid.each_cell((cell) => {
    const neighbors = [];
    if (cell.north !== null) {
      neighbors.push(cell.north);
    }
    if (cell.east !== null) {
      neighbors.push(cell.east);
    }
    if (neighbors.length > 0) {
      const index = Math.round(Math.random() * neighbors.length);
      const target = neighbors[index];
      if (target) {
        cell.link(target);
      }
    }
  });
}
