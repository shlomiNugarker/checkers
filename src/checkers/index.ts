import { Board } from './Board'
import type { Piece } from './Piece'
import type { Coord } from './models/Coord'

export class Game {
  board: Board
  isBlackTurn = false
  selectedPiece: Piece | null = null

  constructor() {
    this.board = new Board(this)
  }

  isValidMove(from: any, to: any) {
    console.log('isValidMove', from, to)
  }

  isBlackPiece(piece: Piece) {
    return piece.name === 'b'
  }

  setSelectedPiece(piece: Piece | null) {
    this.selectedPiece = piece
  }

  isEmptyCell(coord: Coord) {
    return !!this.board.board[coord.i][coord.j]
  }

  onClickBoard(coord: Coord) {
    // handle eatble move:
    // handle piece color:
    // handle step move:

    // handle piece selection:
    if (!this.selectedPiece) {
      this.setSelectedPiece(this.board.board[coord.i][coord.j])
      console.log(this)
    }
  }
}
