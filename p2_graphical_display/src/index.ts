import p5 from 'p5';
import { app } from './sketch';

window.onload = () => {
  const container = document.getElementById('p5-container');
  if (container !== null) {
    new p5(app, container);
  } else {
    console.log('COULD NOT FIND THE P5 CONTAINER');
  }
};
