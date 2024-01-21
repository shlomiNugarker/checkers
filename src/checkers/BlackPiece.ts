import type { Game } from '.'
import { Piece } from './Piece'

export class BlackPiece extends Piece {
  name = 'b'
  game: Game

  constructor(game: Game, coord: any) {
    super(coord)
    this.game = game
  }

  getPossibleCoords = () => {
    console.log('getAllPossibleCoords')
  }
}
