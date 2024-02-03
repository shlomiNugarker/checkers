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
  isBlackTurn = false
  selectedPiece: Piece | null = null
  isBlackWon = false
  isWhiteWon = false

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

  isPlayerPiece(piece: Piece) {
    return this.isBlackPiece(piece) === this.isBlackTurn
  }

  getPlayerPieces(isBlackTurn: boolean = this.isBlackTurn) {
    const playerPieces: Piece[] = []
    this.board.board.forEach((rowPieces) => {
      rowPieces.forEach((piece) => {
        if (piece && isBlackTurn === this.isBlackPiece(piece)) {
          playerPieces.push(piece)
        }
      })
    })
    return playerPieces
  }

  isGameOver() {
    const playerPieces = this.getPlayerPieces()
    // handle case when there are pieces without a legal move:
    if (playerPieces.length) {
      console.log()
    }

    // handle case if there are no more pieces:
    if (!playerPieces.length) {
      if (this.isBlackTurn) return (this.isWhiteWon = true)
      else if (!this.isBlackTurn) return (this.isBlackWon = true)
    }
    return false
  }

  onClickBoard(coord: Coord) {
    const clickedPiece = this.board.board[coord.i][coord.j]
    if (clickedPiece && this.isPlayerPiece(clickedPiece)) {
      this.setSelectedPiece(clickedPiece)
    } else if (this.selectedPiece && this.isPlayerPiece(this.selectedPiece)) {
      this.selectedPiece.move(coord) && this.switchTurn()
      this.selectedPiece = null
    }
  }
}
