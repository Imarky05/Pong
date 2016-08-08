import Paddle from './Paddle';
import Board from './Board';
import Ball from './Ball';
import ScoreBoard from './ScoreBoard';
import settings from './settings';

export default class Game {
	constructor() {
		const canvas = document.getElementById('game');
      this.width = canvas.width;
      this.height = canvas.height;
      this.context = canvas.getContext('2d');
      this.context.fillStyle = 'white';

      // boards
      this.board = new Board(this.width, this.height);

      // players
      this.player1 = new Paddle(this.height, settings.gap, settings.p1Keys);
      this.player2 = new Paddle(this.height, this.width - 4 - settings.gap, settings.p2Keys);

      //Ball
      this.ball = new Ball(this.height, this.width);

      // Scores
      this.p1score = new ScoreBoard((this.width/4),20);
      this.p2score = new ScoreBoard(((this.width/4)*3),20);

      // console.log(this.player1, this.player2);
	}
	drawLine() {
      this.context.setLineDash([10, 10]);
      this.context.beginPath();
      this.context.moveTo(this.width / 2, 0);
      this.context.lineTo(this.width / 2, this.height);
      this.context.strokeStyle = "red";
      this.context.stroke();
   }
   render() {
      this.drawLine();

      // boarder
      this.board.render(this.context);

      // paddles
      this.player1.render(this.context);
      this.player2.render(this.context);


      this.ball.render(this.context, this.player1, this.player2);
      this.ball.fillStyle = "red";
      //console.log(this.ball);

      // scoreboard
      this.p1score.draw(this.context, this.player1);
      this.p2score.draw(this.context, this.player2);

   }
}