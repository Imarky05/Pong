export default class ScoreBoard {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.score = 0;
   }
   draw(ctx, player) {
      ctx.font = "15px Helvetica";
      ctx.fillText(player.score, this.x, this.y);
      // ctx.fillText(this.score, this.x, this.y);
   }
}