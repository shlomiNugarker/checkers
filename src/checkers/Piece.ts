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

  move(to: Coord): void {
    if (!this.isValidMove(to)) return

    // Check if the move is for eating
    const di = to.i - this.coord.i
    const dj = to.j - this.coord.j
    const isEatingMove = Math.abs(di) === 2 && Math.abs(dj) === 2

    if (isEatingMove) {
      const eatenPieceCoord = { i: this.coord.i + di / 2, j: this.coord.j + dj / 2 }
      const eatenPiece = this.game.board.board[eatenPieceCoord.i][eatenPieceCoord.j]
      if (eatenPiece && this.game.DoesThePieceBelongToTheOpponent(eatenPiece)) {
        this.game.board.board[eatenPieceCoord.i][eatenPieceCoord.j] = null
      } else {
        // Invalid eating move, handle error or log a message
        return
      }
    }

    // Move the piece to the new position
    const pieceToMove = this.game.board.board[this.coord.i][this.coord.j]
    this.game.board.board[this.coord.i][this.coord.j] = null

    if (pieceToMove) {
      pieceToMove.coord = to
      const isShouldBeBlackKing = this.game.isBlackPiece(pieceToMove) && pieceToMove.coord.i === 7
      const isShouldBeWhiteKing = !this.game.isBlackPiece(pieceToMove) && pieceToMove.coord.i === 0

      // Mark as a king
      if (isShouldBeBlackKing) {
        pieceToMove.name = PieceType.BlackKing
      } else if (isShouldBeWhiteKing) {
        pieceToMove.name = PieceType.WhiteKing
      }

      this.game.board.board[to.i][to.j] = pieceToMove
    } else {
      // Invalid move, handle error or log a message
      return
    }
  }

  getPossibleMoves = (): Coord[] => {
    const isWhitePiece = this.name === PieceType.White
    const isBlackPiece = this.name === PieceType.Black
    const isWhiteKingPiece = this.name === PieceType.WhiteKing
    const isBlackKingPiece = this.name === PieceType.BlackKing

    const possibleMoves: Coord[] = []
    const whiteDirections = [
      { di: -1, dj: 1 }, // Top-right / white
      { di: -1, dj: -1 } // Top-left / white
    ]
    const blackDirections = [
      { di: 1, dj: 1 }, // Bottom-right / black
      { di: 1, dj: -1 } // Bottom-left / black
    ]

    const addMoves = (diections: { di: number; dj: number }[]) => {
      for (const direction of diections) {
        const newRow = this.coord.i + direction.di
        const newCol = this.coord.j + direction.dj

        if (this.isValidCell(newRow, newCol) && !this.game.board.board[newRow][newCol]) {
          possibleMoves.push({ i: newRow, j: newCol })
        } else if (this.isValidCell(newRow, newCol) && this.isPossibleToEat(newRow, newCol)) {
          const eatRow = newRow + direction.di
          const eatCol = newCol + direction.dj
          if (this.isValidCell(eatRow, eatCol) && !this.game.board.board[eatRow][eatCol]) {
            possibleMoves.push({ i: eatRow, j: eatCol })
          }
        }
      }
    }

    if (isWhitePiece) {
      addMoves(whiteDirections)
    } else if (isBlackPiece) {
      addMoves(blackDirections)
    } else if (isWhiteKingPiece || isBlackKingPiece) {
      addMoves([...whiteDirections, ...blackDirections])
    }
    return possibleMoves
  }

  private isValidCell(i: number, j: number): boolean {
    return i >= 0 && i < 8 && j >= 0 && j < 8
  }
  private isPossibleToEat(i: number, j: number) {
    const pieceToEat = this.game.board.board[i][j]
    if (pieceToEat && this.game.DoesThePieceBelongToTheOpponent(pieceToEat)) return true
    return false
  }
}
