import { Board } from './Board'
import type { Piece } from './Piece'
import type { Coord } from './models/Coord'

export enum PieceType {
  White = 'w',
  Black = 'b',
  WhiteKing = 'wk',
  BlackKing = 'bk'
}

export class Game {
  board: Board
  isBlackTurn = true
  selectedPiece: Piece | null = null

  constructor() {
    this.board = new Board(this)
  }

  switchTurn() {
    this.isBlackTurn = !this.isBlackTurn
  }

  isBlackPiece(piece: Piece) {
    return piece.name === PieceType.Black || piece.name === PieceType.BlackKing
  }

  DoesThePieceBelongToTheOpponent(piece: Piece) {
    return this.isBlackPiece(piece) !== this.isBlackTurn
  }

  setSelectedPiece(piece: Piece | null) {
    this.selectedPiece = piece
  }

  isEmptyCell(coord: Coord) {
    return this.board.board[coord.i][coord.j] === null
  }

  onClickBoard(coord: Coord) {
    const clickedPiece = this.board.board[coord.i][coord.j]
    if (clickedPiece) {
      this.setSelectedPiece(clickedPiece)
    } else if (this.selectedPiece) {
      this.selectedPiece.move(coord)
      this.selectedPiece = null
    } else if (!this.selectedPiece) {
      this.setSelectedPiece(clickedPiece)
    }
  }
}
