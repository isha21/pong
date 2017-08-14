import {
  SVG_NS
} from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/traffic_city_2.wav');
    this.reset();
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;


    while (this.vy === 0) {

      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    this.vx = this.direction * (6 - Math.abs(this.vy));

  }

  wallCollision() {
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {


      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {

        this.vx = -this.vx;
        this.ping.play();

      }


    } else {
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x - this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();

      }

    }
  }

  goal(player) {
    player.score++;
    this.reset();
  }


  render(svg, player1, player2, greenBall) {
    this.x += this.vx;
    this.y += this.vy;


    this.wallCollision();
    this.paddleCollision(player1, player2);

    if (this.x >= this.boardWidth) {
      this.goal(player1);
      this.vx = -this.vx;

    } else if (this.x <= 0) {
      this.goal(player2);
    }


    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'fill', 'yellow');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'r', '16');

    if (greenBall) {
      ball.setAttributeNS(null, 'fill', 'green');
      ball.setAttributeNS(null, 'cx', this.x);
      ball.setAttributeNS(null, 'cy', this.y);
      ball.setAttributeNS(null, 'r', '16');
    }

    svg.appendChild(ball);
  }

}