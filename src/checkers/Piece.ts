import type { Game } from '.'
import type { Coord } from './models/Coord'

export class Piece {
  name: string
  coord: Coord
  game: Game

  constructor(name: string, game: Game, coord: Coord) {
    this.name = name
    this.coord = coord
    this.game = game
  }

  move(to: Coord) {
    const PieceToMove = this.game.board.board[this.coord.i][this.coord.j]
    this.game.board.board[this.coord.i][this.coord.j] = null

    if (PieceToMove) {
      PieceToMove.coord.i = to.i
      PieceToMove.coord.j = to.j
    }
    this.game.board.board[to.i][to.j] = PieceToMove
  }

  getPossibleMoves = () => {
    const isWhitePiece = this.name === 'w'
    const isBlackPiece = this.name === 'b'
    const isKingPiece = this.name === 'k'

    const PossibleMoves: Coord[] = []

    const isRightWhiteMoveInsideTheBoard =
      this.coord.i - 1 >= 0 &&
      this.coord.i - 1 <= 7 &&
      this.coord.j + 1 >= 0 &&
      this.coord.j + 1 <= 7

    const isLeftWhiteMoveInsideTheBoard =
      this.coord.i - 1 >= 0 &&
      this.coord.i - 1 <= 7 &&
      this.coord.j - 1 >= 0 &&
      this.coord.j - 1 <= 7

    const isRightBlackMoveInsideTheBoard =
      this.coord.i + 1 >= 0 &&
      this.coord.i + 1 <= 7 &&
      this.coord.j + 1 >= 0 &&
      this.coord.j + 1 <= 7

    const isLeftBlackMoveInsideTheBoard =
      this.coord.i + 1 >= 0 &&
      this.coord.i + 1 <= 7 &&
      this.coord.j - 1 >= 0 &&
      this.coord.j - 1 <= 7

    if (isWhitePiece) {
      isRightWhiteMoveInsideTheBoard &&
        PossibleMoves.push({ i: this.coord.i - 1, j: this.coord.j + 1 })
      isLeftWhiteMoveInsideTheBoard &&
        PossibleMoves.push({ i: this.coord.i - 1, j: this.coord.j - 1 })
    } else if (isBlackPiece) {
      isRightBlackMoveInsideTheBoard &&
        PossibleMoves.push({ i: this.coord.i + 1, j: this.coord.j + 1 })

      isLeftBlackMoveInsideTheBoard &&
        PossibleMoves.push({ i: this.coord.i + 1, j: this.coord.j - 1 })
    } else if (isKingPiece) {
      isRightWhiteMoveInsideTheBoard &&
        PossibleMoves.push({ i: this.coord.i - 1, j: this.coord.j + 1 })
      isLeftWhiteMoveInsideTheBoard &&
        PossibleMoves.push({ i: this.coord.i - 1, j: this.coord.j - 1 })

      isRightBlackMoveInsideTheBoard &&
        PossibleMoves.push({ i: this.coord.i + 1, j: this.coord.j + 1 })
      isLeftBlackMoveInsideTheBoard &&
        PossibleMoves.push({ i: this.coord.i + 1, j: this.coord.j - 1 })
    }
    return PossibleMoves
  }
}
