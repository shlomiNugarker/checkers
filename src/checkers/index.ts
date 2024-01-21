import type { BlackPiece } from './BlackPiece'
import { Board } from './Board'
import type { WhitePiece } from './WhitePiece'

export class Game {
  board: Board
  isBlackTurn = false
  selectedPiece: BlackPiece | WhitePiece | null = null

  constructor() {
    this.board = new Board(this)
  }

  isValidMove(from: any, to: any) {
    console.log('isValidMove', from, to)
  }
  isBlackPiece(piece: string) {
    console.log('isBlackPiece', piece)
  }

  setSelectedPiece(piece: BlackPiece | WhitePiece | null) {
    this.selectedPiece = piece
  }
}
