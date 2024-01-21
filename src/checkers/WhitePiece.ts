import type { Game } from '.'
import { Piece } from './Piece'

export class WhitePiece extends Piece {
  name = 'w'
  game: Game

  constructor(game: Game, coord: any) {
    super(coord)
    this.game = game
  }

  getPossibleCoords = () => {
    console.log('getAllPossibleCoords')
  }
}
