const size = 3;
const pongSound01 = document.getElementById('pongSound01');
const pongSound02 = document.getElementById('pongSound02');

export default class Ball {
   constructor(height, width) {
		this.x = width/2;
		this.y = height/2;
		this.vy = Math.max((Math.floor(Math.random() * 12 - 6)), 3);
		this.vx = (7 - Math.abs(this.vy));
		this.size = size;
		this.maxHeight = height;
		this.ydirection = 1;
		this.xdirection = 1;
		this.maxWidth = width;
   }
   wallBounce(ctx){
   		if(this.y >= this.maxHeight - size){
   			pongSound02.play();
   			this.y = this.maxHeight - size; 
      		this.ydirection = -this.ydirection;
   		}
   		else if (this.y <= size) {
   			pongSound02.play();
   			this.y = size; 
      		this.ydirection = -this.ydirection;
   		}

   }
   ballReset(){
   		this.x = this.maxWidth/2;
   		this.y = this.maxHeight/2;
   		this.vy = Math.max((Math.floor(Math.random() * 12 - 6)), 3);
		this.vx = (7 - (Math.abs(this.vy)));
   }
   goal(player1,player2){
   		if(this.x >= this.maxWidth){
   			this.ballReset();
   			player1.score += 1;
   		}
   		else if (this.x <= 0){
   			this.ballReset();
   			player2.score += 1;
   		}
   }
   paddleCollision (player1, player2) {
   		if(this.x <= player2.x + player2.width && 
   			this.x >= player2.x - size && 
   			this.y <= player2.y + player2.height && 
   			this.y >= player2.y)
   		{
   			pongSound01.play();
   			this.x = player2.x - player2.width; 
      		this.xdirection = -this.xdirection;
      		this.vy = this.vy + (Math.random()*0.5);
   		}
   		else if (this.x >= player1.x + player1.width && 
   			this.x <= player1.x + player1.width + size && 
   			this.y <= player1.y + player1.height && 
   			this.y >= player1.y) 
   		{
   			pongSound01.play();
   			this.x = player1.x + (player1.width*2); 
      		this.xdirection = -this.xdirection;
      		this.vy = this.vy + (Math.random()*0.5);
   		}
   }
   ballRender(ctx){
   		ctx.beginPath();
		ctx.arc(this.x, this.y, size, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		
   }

   render(ctx, player1, player2) {
   		this.paddleCollision(player1, player2);

   		this.wallBounce(ctx);
   		this.goal(player1,player2);

   		this.x += this.vx * this.xdirection;
   		this.y += this.vy * this.ydirection;

   		this.ballRender(ctx);

   }
}