import {SVG_NS} from '../settings';



export default class Score {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  render(svg, score) {
    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttributeNS(null, 'fill', 'white');
    text.setAttributeNS(null, 'font-size', '40');
    text.setAttributeNS(null, 'x', this.x);
    text.setAttributeNS(null, 'y', this.y);
    text.setAttributeNS(null, 'font-family','Silkscreen Web');
    text.textContent = score;

    svg.appendChild(text);


  }
} 