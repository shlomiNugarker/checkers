import type { Game } from '.'
import { Piece } from './Piece'

export class WhitePiece extends Piece {
  name = 'w'
  game: Game

  constructor(game: Game, coord: any) {
    super(game, coord)
    this.game = game
  }
}
