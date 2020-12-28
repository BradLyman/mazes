import { Grid } from './grid';
import { graphical_view } from './grid_view';
import { binary_tree } from './algorithms/binary_tree';
import p5 from 'p5';

export const app = (sketch: p5): void => {
  const grid = new Grid(75, 75);
  binary_tree(grid);

  const dimensions = () => {
    const min_dim = Math.min(sketch.windowWidth, sketch.windowHeight);
    const width = min_dim * 0.95;
    const height = min_dim * 0.95;
    return { width, height };
  };

  sketch.setup = () => {
    const { width, height } = dimensions();
    sketch.createCanvas(width, height, 'p2d');
  };

  sketch.draw = () => {
    sketch.background(sketch.color(224));
    graphical_view(grid, sketch);
    sketch.noLoop();
  };

  sketch.windowResized = () => {
    const { width, height } = dimensions();
    sketch.resizeCanvas(width, height);
  };
};
