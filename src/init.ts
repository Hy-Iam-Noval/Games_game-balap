const canvas = document.getElementById("canvas") as HTMLCanvasElement
const gameOver = document.getElementById("gameover")
const ctx = canvas.getContext("2d")

function range(start:number, end:number) {
   const list = []
   for (const i of Array(end).keys()) {
      const newI = start + i
      if(newI >= end) break;
      list.push(newI)
   }   
   
   list.push(end)
   return list
}
