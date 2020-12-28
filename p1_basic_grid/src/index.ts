import { Grid, text_view } from './grid';
import { binary_tree } from './algorithms/binary_tree';

window.onload = () => {
  const grid = new Grid(10, 10);
  binary_tree(grid);

  const node = document.getElementById('mazeDisplay');
  if (node !== null) {
    node.textContent = text_view(grid);
  } else {
    console.log('COULD NOT FIND THE THING');
  }
};
