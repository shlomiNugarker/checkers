import { Board } from './Board'

export class Game {
  board: Board
  isBlackTurn = false
  selectedCoord: any

  constructor() {
    this.board = new Board(this)
  }

  movePiece(from: any, to: any) {
    console.log('movePiece', from, to)
  }
  isValidMove(from: any, to: any) {
    console.log('isValidMove', from, to)
  }
  isBlackPiece(piece: string) {
    console.log('isBlackPiece', piece)
  }
}
