/// <reference path="./d/Game.ts"/>
/// <reference path="./init.ts"/>


const game = new Game()

document.getElementById("tryagain")!.addEventListener('click', ()=>{
   game.start()
})

document.addEventListener('keydown', (key)=>{
   game.updateMove(key)
})

setInterval(()=>game.update().draw(), 60)