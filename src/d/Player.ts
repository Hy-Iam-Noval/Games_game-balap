/// <reference path="./Game.ts"/>
/// <reference path="../init.ts"/>


class Player implements IGame {
   update(game: Game): this {
      const {gs, x, y} = game
      ctx!.fillStyle = "lime"
      ctx!.fillRect(x * gs, y * gs, gs - 2, gs - 2)
      return this
   }
}
