import { PieceType, type Game } from '.'
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
        // Initialize black pieces
        if (i === 0 && j % 2 === 0) {
          piece = new Piece({ name: PieceType.Black, game, coord })
        } else if (i === 1 && j % 2 !== 0) {
          piece = new Piece({ name: PieceType.Black, game, coord })
        } else if (i === 2 && j % 2 === 0) {
          piece = new Piece({ name: PieceType.Black, game, coord })
        }
        // Initialize white pieces
        else if (i === 5 && j % 2 !== 0) {
          piece = new Piece({ name: PieceType.White, game, coord })
        } else if (i === 6 && j % 2 === 0) {
          piece = new Piece({ name: PieceType.White, game, coord })
        } else if (i === 7 && j % 2 !== 0) {
          piece = new Piece({ name: PieceType.White, game, coord })
        }
        this.board[i][j] = piece
      }
    }
  }
}
