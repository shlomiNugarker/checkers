import { PieceType, type Game } from '.'
import type { Coord } from './models/Coord'

interface PieceOptions {
  name: PieceType
  game: Game
  coord: Coord
}

export class Piece {
  name: PieceType
  coord: Coord
  game: Game

  constructor({ name, game, coord }: PieceOptions) {
    this.name = name
    this.coord = coord
    this.game = game
  }

  isValidMove(to: Coord) {
    const possibleMoves = this.getPossibleMoves()
    return possibleMoves.some((coord) => coord.i === to.i && coord.j === to.j)
  }

  move(to: Coord) {
    if (!this.isValidMove(to)) return

    const pieceToMove = this.game.board.board[this.coord.i][this.coord.j]
    this.game.board.board[this.coord.i][this.coord.j] = null

    if (pieceToMove) {
      pieceToMove.coord = to
    }
    this.game.board.board[to.i][to.j] = pieceToMove
  }

  getPossibleMoves = () => {
    const isWhitePiece = this.name === PieceType.White
    const isBlackPiece = this.name === PieceType.Black
    const isWhiteKingPiece = this.name === PieceType.WhiteKing
    const isBlackKingPiece = this.name === PieceType.BlackKing

    const possibleMoves: Coord[] = []

    // WHITE PIECE
    if (isWhitePiece) {
      this.isValidCell(this.coord.i - 1, this.coord.j + 1) &&
        possibleMoves.push({ i: this.coord.i - 1, j: this.coord.j + 1 }) // Top-right

      this.isValidCell(this.coord.i - 1, this.coord.j - 1) &&
        possibleMoves.push({ i: this.coord.i - 1, j: this.coord.j - 1 }) // Top-left
    }
    // BLACK PIECE
    else if (isBlackPiece) {
      this.isValidCell(this.coord.i + 1, this.coord.j + 1) &&
        possibleMoves.push({ i: this.coord.i + 1, j: this.coord.j + 1 }) // Bottom-right

      this.isValidCell(this.coord.i + 1, this.coord.j - 1) &&
        possibleMoves.push({ i: this.coord.i + 1, j: this.coord.j - 1 }) // Bottom-left
    }
    // KING PIECE
    else if (isWhiteKingPiece || isBlackKingPiece) {
      this.isValidCell(this.coord.i - 1, this.coord.j + 1) &&
        possibleMoves.push({ i: this.coord.i - 1, j: this.coord.j + 1 }) // Top-right

      this.isValidCell(this.coord.i - 1, this.coord.j - 1) &&
        possibleMoves.push({ i: this.coord.i - 1, j: this.coord.j - 1 }) // Top-left

      this.isValidCell(this.coord.i + 1, this.coord.j + 1) &&
        possibleMoves.push({ i: this.coord.i + 1, j: this.coord.j + 1 }) // Bottom-right

      this.isValidCell(this.coord.i + 1, this.coord.j - 1) &&
        possibleMoves.push({ i: this.coord.i + 1, j: this.coord.j - 1 }) // Bottom-left
    }
    return possibleMoves
  }

  private isValidCell(i: number, j: number): boolean {
    return i >= 0 && i < 8 && j >= 0 && j < 8 && !this.game.board.board[i][j]
  }
}
