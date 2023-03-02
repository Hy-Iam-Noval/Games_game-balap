/// <reference path="../init.ts"/>
/// <reference path="./Player.ts"/>
/// <reference path="./Enemy.ts"/>

const player = new Player()

interface IGame {
   update(game:Game):this
}

class Game implements IGame {
   private xv = 0 // speed
   private yv = 0 // speed
   private enemy:Enemy
   x = 1 ; y = 1 // coordinate player
   gs = 80 // grid side 
   tx = 10 //  tongle x
   ty = 5 // tongle y

   constructor(){
      this.enemy =  new Enemy(this)
   }

   updateMove(key: KeyboardEvent){
      const keyCodeIs = (code:number) => key.keyCode === code
      if (keyCodeIs(37) && this.x >= 0) { // left
         this.xv = -0.4
         this.yv = 0
      }
      if (keyCodeIs(38) && this.y >= 0) { // up
         this.xv = 0
         this.yv = -0.4   
      }
      if (keyCodeIs(39) && this.x <= this.tx - 1) { // right
         this.xv = 0.4
         this.yv = 0      
      }
      if (keyCodeIs(40) && this.y <= this.ty - 1) { //down
         this.xv = 0
         this.yv = 0.4
      }
   }   

   update(){
      this.x += this.xv
      this.y += this.yv
      this.stopMove()
      this.draw()
      this.reset()
      return this
   }

   stopMove(){
      if(
         this.x <= 0 || 
         this.x >= this.tx - 2 || 
         this.y <= 0 || 
         this.y >= this.ty -2
      ) {
         this.reset()
      }
   }

   reset(){
      this.xv = 0
      this.yv = 0   
   }

   draw(){
      ctx!.fillStyle = "black"
      ctx!.fillRect(0,0, canvas.width, canvas.height)
      player.update(this)
      this.enemy.add().update()
   }

   stop(){
      gameOver!.style.visibility = "visible"
      this.reset()
      this.x = this.y = 1          
   }
   start(){
      gameOver!.style.visibility = "hidden"
      this.enemy.stop = false
   }
}