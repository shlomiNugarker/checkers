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

    // handle eating:
    const doesDidTwoStepsForEatTopRight = this.coord.i - 2 === to.i && this.coord.j + 2 === to.j
    const doesDidTwoStepsForEatTopLeft = this.coord.i - 2 === to.i && this.coord.j - 2 === to.j
    const doesDidTwoStepsForEatBottomRight = this.coord.i + 2 === to.i && this.coord.j + 2 === to.j
    const doesDidTwoStepsForEatBottomLeft = this.coord.i + 2 === to.i && this.coord.j - 2 === to.j

    // WHITE
    // eating top-right:
    if (doesDidTwoStepsForEatTopRight) {
      const eatenPiece = this.game.board.board[this.coord.i - 1][this.coord.j + 1]
      if (eatenPiece && this.game.DoesThePieceBelongToTheOpponent(eatenPiece))
        this.game.board.board[eatenPiece.coord.i][eatenPiece.coord.j] = null
    }
    // eating top-left:
    else if (doesDidTwoStepsForEatTopLeft) {
      const eatenPiece = this.game.board.board[this.coord.i - 1][this.coord.j - 1]
      if (eatenPiece && this.game.DoesThePieceBelongToTheOpponent(eatenPiece))
        this.game.board.board[eatenPiece.coord.i][eatenPiece.coord.j] = null
    }

    // BLACK
    // eating Bottom-right:
    else if (doesDidTwoStepsForEatBottomRight) {
      const eatenPiece = this.game.board.board[this.coord.i + 1][this.coord.j + 1]
      if (eatenPiece && this.game.DoesThePieceBelongToTheOpponent(eatenPiece))
        this.game.board.board[eatenPiece.coord.i][eatenPiece.coord.j] = null
    }
    // eating Bottom-left:
    else if (doesDidTwoStepsForEatBottomLeft) {
      const eatenPiece = this.game.board.board[this.coord.i + 1][this.coord.j - 1]
      if (eatenPiece && this.game.DoesThePieceBelongToTheOpponent(eatenPiece))
        this.game.board.board[eatenPiece.coord.i][eatenPiece.coord.j] = null
    }

    // moving the player piece:
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
      if (this.isValidCellForOneStep(this.coord.i - 1, this.coord.j + 1))
        possibleMoves.push({ i: this.coord.i - 1, j: this.coord.j + 1 }) // Top-right
      else if (this.isPossibleToEat(this.coord.i - 1, this.coord.j + 1)) {
        possibleMoves.push({ i: this.coord.i - 2, j: this.coord.j + 2 }) // Top-right - eat
      }

      if (this.isValidCellForOneStep(this.coord.i - 1, this.coord.j - 1))
        possibleMoves.push({ i: this.coord.i - 1, j: this.coord.j - 1 }) // Top-left
      else if (this.isPossibleToEat(this.coord.i - 1, this.coord.j - 1)) {
        possibleMoves.push({ i: this.coord.i - 2, j: this.coord.j - 2 }) // Top-left - eat
      }
    }
    // BLACK PIECE
    else if (isBlackPiece) {
      if (this.isValidCellForOneStep(this.coord.i + 1, this.coord.j + 1))
        possibleMoves.push({ i: this.coord.i + 1, j: this.coord.j + 1 }) // Bottom-right
      else if (this.isPossibleToEat(this.coord.i + 1, this.coord.j + 1)) {
        possibleMoves.push({ i: this.coord.i + 2, j: this.coord.j + 2 }) // Bottom-right - eat
      }

      if (this.isValidCellForOneStep(this.coord.i + 1, this.coord.j - 1))
        possibleMoves.push({ i: this.coord.i + 1, j: this.coord.j - 1 }) // Bottom-left
      else if (this.isPossibleToEat(this.coord.i + 1, this.coord.j - 1)) {
        possibleMoves.push({ i: this.coord.i + 2, j: this.coord.j - 2 }) // Bottom-left - eat
      }
    }
    // KING PIECE
    else if (isWhiteKingPiece || isBlackKingPiece) {
      if (this.isValidCellForOneStep(this.coord.i - 1, this.coord.j + 1)) {
        possibleMoves.push({ i: this.coord.i - 1, j: this.coord.j + 1 }) // Top-right
      } else if (this.isPossibleToEat(this.coord.i - 1, this.coord.j + 1)) {
        possibleMoves.push({ i: this.coord.i - 2, j: this.coord.j + 2 }) // Top-right - eat
      }

      if (this.isValidCellForOneStep(this.coord.i - 1, this.coord.j - 1)) {
        possibleMoves.push({ i: this.coord.i - 1, j: this.coord.j - 1 }) // Top-left
      } else if (this.isPossibleToEat(this.coord.i - 1, this.coord.j - 1)) {
        possibleMoves.push({ i: this.coord.i - 2, j: this.coord.j - 2 }) // Top-left - eat
      }

      if (this.isValidCellForOneStep(this.coord.i + 1, this.coord.j + 1)) {
        possibleMoves.push({ i: this.coord.i + 1, j: this.coord.j + 1 }) // Bottom-right
      } else if (this.isPossibleToEat(this.coord.i + 1, this.coord.j + 1)) {
        possibleMoves.push({ i: this.coord.i + 2, j: this.coord.j + 2 }) // Bottom-right - eat
      }

      if (this.isValidCellForOneStep(this.coord.i + 1, this.coord.j - 1)) {
        possibleMoves.push({ i: this.coord.i + 1, j: this.coord.j - 1 }) // Bottom-left
      } else if (this.isPossibleToEat(this.coord.i + 1, this.coord.j - 1)) {
        possibleMoves.push({ i: this.coord.i + 2, j: this.coord.j - 2 }) // Bottom-left - eat
      }
    }
    return possibleMoves
  }

  private isValidCellForOneStep(i: number, j: number): boolean {
    return i >= 0 && i < 8 && j >= 0 && j < 8 && !this.game.board.board[i][j]
  }
  private isPossibleToEat(i: number, j: number) {
    const pieceToEat = this.game.board.board[i][j]
    if (pieceToEat && this.game.DoesThePieceBelongToTheOpponent(pieceToEat)) return true
    return false
  }
}
