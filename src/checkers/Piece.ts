export class Piece {
  coord: any

  constructor(coord: any) {
    this.coord = coord
  }

  move(from: any, to: any) {
    console.log('move', from, to)
  }
}
