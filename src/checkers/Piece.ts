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

  isValidMove(to: Coord) {
    const possibleMoves = this.getPossibleMoves()
    return possibleMoves.some((coord) => coord.i === to.i && coord.j === to.j)
  }

  move(to: Coord) {
    if (this.isValidMove(to)) {
      const PieceToMove = this.game.board.board[this.coord.i][this.coord.j]
      this.game.board.board[this.coord.i][this.coord.j] = null

      if (PieceToMove) {
        PieceToMove.coord.i = to.i
        PieceToMove.coord.j = to.j
      }
      this.game.board.board[to.i][to.j] = PieceToMove
    }
  }

  getPossibleMoves = () => {
    const isWhitePiece = this.name === 'w'
    const isBlackPiece = this.name === 'b'
    const isWhiteKingPiece = this.name === 'wk'
    const isBlackKingPiece = this.name === 'bk'

    const PossibleMoves: Coord[] = []

    // HANDLE MOVES
    const isRightWhiteCellMoveEmpty =
      isWhitePiece && this.game.board.board[this.coord.i - 1][this.coord.j + 1] === null
    const isRightWhiteMoveInsideTheBoard =
      this.coord.i - 1 >= 0 &&
      this.coord.i - 1 <= 7 &&
      this.coord.j + 1 >= 0 &&
      this.coord.j + 1 <= 7

    const isLeftWhiteCellMoveEmpty =
      isWhitePiece && this.game.board.board[this.coord.i - 1][this.coord.j - 1] === null
    const isLeftWhiteMoveInsideTheBoard =
      this.coord.i - 1 >= 0 &&
      this.coord.i - 1 <= 7 &&
      this.coord.j - 1 >= 0 &&
      this.coord.j - 1 <= 7

    const isRightBlackCellMoveEmpty =
      isBlackPiece && this.game.board.board[this.coord.i + 1][this.coord.j + 1] === null
    const isRightBlackMoveInsideTheBoard =
      this.coord.i + 1 >= 0 &&
      this.coord.i + 1 <= 7 &&
      this.coord.j + 1 >= 0 &&
      this.coord.j + 1 <= 7

    const isLeftBlackCellMoveEmpty =
      isBlackPiece && this.game.board.board[this.coord.i + 1][this.coord.j - 1] === null
    const isLeftBlackMoveInsideTheBoard =
      this.coord.i + 1 >= 0 &&
      this.coord.i + 1 <= 7 &&
      this.coord.j - 1 >= 0 &&
      this.coord.j - 1 <= 7

    // WHITE PIECE
    if (isWhitePiece) {
      isRightWhiteMoveInsideTheBoard &&
        isRightWhiteCellMoveEmpty &&
        PossibleMoves.push({ i: this.coord.i - 1, j: this.coord.j + 1 })
      isLeftWhiteMoveInsideTheBoard &&
        isLeftWhiteCellMoveEmpty &&
        PossibleMoves.push({ i: this.coord.i - 1, j: this.coord.j - 1 })
    }
    // BLACK PIECE
    else if (isBlackPiece) {
      isRightBlackMoveInsideTheBoard &&
        isRightBlackCellMoveEmpty &&
        PossibleMoves.push({ i: this.coord.i + 1, j: this.coord.j + 1 })

      isLeftBlackMoveInsideTheBoard &&
        isLeftBlackCellMoveEmpty &&
        PossibleMoves.push({ i: this.coord.i + 1, j: this.coord.j - 1 })
    }
    // KING PIECE
    else if (isWhiteKingPiece || isBlackKingPiece) {
      isRightWhiteMoveInsideTheBoard &&
        isRightWhiteCellMoveEmpty &&
        PossibleMoves.push({ i: this.coord.i - 1, j: this.coord.j + 1 })
      isLeftWhiteMoveInsideTheBoard &&
        isLeftWhiteCellMoveEmpty &&
        PossibleMoves.push({ i: this.coord.i - 1, j: this.coord.j - 1 })

      isRightBlackMoveInsideTheBoard &&
        isRightBlackCellMoveEmpty &&
        PossibleMoves.push({ i: this.coord.i + 1, j: this.coord.j + 1 })
      isLeftBlackMoveInsideTheBoard &&
        isLeftBlackCellMoveEmpty &&
        PossibleMoves.push({ i: this.coord.i + 1, j: this.coord.j - 1 })
    }
    return PossibleMoves
  }
}
