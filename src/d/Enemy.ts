/// <reference path="../init.ts"/>
/// <reference path="Game.ts"/>


class Enemy implements IGame {
   private enemy: { x: number, y: number }[] = []
   private readonly size:number
   stop = false
   constructor(private game:Game){
      this.size = game.gs - 2
   }
   update(): this {
      const { gs } = this.game
      this.enemy = this.enemy.filter(i=>i.x > -1).map(i => {
         // showing img
         ctx!.fillStyle = "red"
         ctx!.fillRect(i.x * gs, i.y * gs, this.size, this.size)

         this.getHit(i.x, i.y)

         return {x:i.x - 0.1, y:i.y}
      })
      return this
   }

   add() {
      /**
       * Get last y coordinate
       */
      const {game, enemy} = this
      const lastCoor = enemy.slice(enemy.length > 2 ? enemy.length - 2 : 0)
      const yCoor = [...Array(7).keys()]
      const newYCoor = yCoor
         .filter(i=> !lastCoor.some(j=>i === j.y) )
         [Math.floor(Math.random() * 2)]

      /**
       * New x coordinate
       */
      const xCoor = range(game.tx, game.tx + 4)
      const newXCoor = xCoor[Math.floor(Math.random() * xCoor.length)]

      // Push new coordinate

      if(this.stop){
         this.enemy = []
      }else if(this.enemy.length < 5) {
         this.enemy.push({x: newXCoor, y: newYCoor})
      }
      return this
   }

   getHit(x: number, y: number){
      const side = this.size / this.game.gs
      const xHit = 
         this.game.x + side >= x && 
         x + side >= this.game.x
      const yHit = 
         this.game.y + side >= y && 
         this.game.y <=  y + side
      if(xHit && yHit) {
         this.stop = true
         this.game.stop()
      } // gameover
   }

}


