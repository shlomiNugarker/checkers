import { BlackPiece } from './BlackPiece'
import type { Game } from '.'
import { WhitePiece } from './WhitePiece'

export class Board {
  game: Game
  board: (BlackPiece | WhitePiece | null)[][] = []

  constructor(game: Game) {
    this.game = game

    for (let i = 0; i < 8; i++) {
      this.board[i] = []
      for (let j = 0; j < 8; j++) {
        let piece = null
        const coord = { i, j }
        // BLACK
        if (i === 0 && j % 2 === 0) {
          piece = new BlackPiece(game, coord)
        } else if (i === 1 && j % 2 !== 0) {
          piece = new BlackPiece(game, coord)
        } else if (i === 2 && j % 2 === 0) {
          piece = new BlackPiece(game, coord)
        }
        // WHITE
        else if (i === 5 && j % 2 !== 0) {
          piece = new WhitePiece(game, coord)
        } else if (i === 6 && j % 2 === 0) {
          piece = new WhitePiece(game, coord)
        } else if (i === 7 && j % 2 !== 0) {
          piece = new WhitePiece(game, coord)
        }
        this.board[i][j] = piece
      }
    }
  }
}
