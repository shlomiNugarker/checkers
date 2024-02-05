import { PieceType, Game } from '.'
import { Piece } from './Piece'

export class Board {
  game: Game
  board: (Piece | null)[][] = []

  constructor(game: Game) {
    this.game = game

    for (let i = 0; i < 8; i++) {
      this.board[i] = []
      for (let j = 0; j < 8; j++) {
        let piece = null
        const coord = { i, j }

        // Initialize pieces based on their positions
        if ((i + j) % 2 === 0) {
          if (i < 3) {
            piece = new Piece({ name: PieceType.Black, game, coord })
          } else if (i > 4) {
            piece = new Piece({ name: PieceType.White, game, coord })
          }
        }

        this.board[i][j] = piece
      }
    }
  }
}
