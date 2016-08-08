export default class Paddle {
   constructor(height, x, control) {
      this.width = 5;
      this.height = 20;
      this.x = x;
      this.y = (height / 2) - (this.height / 2);
      this.speed = 20;
      this.maxHeight = height;
      this.score = 0;
      document.addEventListener('keydown', event =>{
         switch (event.keyCode) {
         case control.up:
            this.y = Math.max(0,this.y-this.speed);
            break;
         case control.down:
            this.y = Math.min((this.maxHeight - this.height), this.y+this.speed);
            break;
         }
      });
      
   }
   render(ctx) {
      ctx.fillRect(
         this.x, this.y,
         this.width, this.height
      );
      
   }

}