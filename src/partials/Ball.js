import{SVG_NS} from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
  }

  render(svg) {
    const ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'fill', 'white');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'r',this.radius);


    svg.appendChild(ball);
  }
}