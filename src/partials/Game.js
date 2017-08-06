import {
	SVG_NS
}

from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import {
	KEYS
} from '../settings';
import Ball from './Ball';
import Score from './Score';


export default class Game {

	constructor(element, width, height) {
		this.width = width;
		this.height = height;

		this.gameElement = document.getElementById(element);

		this.paddleWidth = 19;
		this.paddleHeight = 96;
		this.boardGap = 10;
		this.ballRadius = 8;


		this.board = new Board(this.width, this.height);

		this.player1 = new Paddle(this.height,this.paddleWidth,this.paddleHeight,	this.boardGap,(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z,
		);

		this.player2 = new Paddle(this.height,	this.paddleWidth,this.paddleHeight,this.width - this.boardGap - this.paddleWidth,(this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down,
		);

	this.player3 = new Paddle(this.height,this.paddleWidth,this.paddleHeight,(this.width/2),(this.height - this.paddleHeight) / 4,
			KEYS.o,
			KEYS.i,
		);


		this.Ball = new Ball(this.ballRadius, this.width,this.height,);

		this.Ball2 = new Ball(this.ballRadius,(this.width/4),this.height/2);
		this.Ball3 = new Ball(this.ballRadius, (this.width-(this.width)/4),this.height-(this.height)/2);

		this.score1 = new Score(this.width / 2 - 150, 30, 30);
		this.score2 = new Score(this.width / 2 + 130, 30, 30);



		document.addEventListener('keydown', event => {
			switch (event.key) {
				case KEYS.spaceBar:
					this.pause = !this.pause;
					break;
			}
		});
	}

	render() {
		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';


		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'version', '1.1');
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'viewbox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.player3.render(svg);
		this.Ball.render(svg, this.player1, this.player2);
		this.Ball2.render(svg, this.player1, this.player2);
		this.Ball3.render(svg, this.player1, this.player2);
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);



	}

}