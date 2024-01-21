import type { Game } from '.'
import type { Coord } from './models/Coord'

export class Piece {
  coord: Coord
  game: Game

  constructor(game: Game, coord: Coord) {
    this.coord = coord
    this.game = game
  }

  move(to: Coord, from: Coord | null = null) {
    console.log('move', from, to)
    const PieceToMove = this.game.board.board[this.coord.i][this.coord.j]
    this.game.board.board[this.coord.i][this.coord.j] = null

    if (PieceToMove) {
      PieceToMove.coord.i = to.i
      PieceToMove.coord.j = to.j
    }
    this.game.board.board[to.i][to.j] = PieceToMove
  }

  getPossibleMoves = () => {
    console.log('getPossibleMoves')
  }
}
