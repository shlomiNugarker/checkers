<template>
  <section class="canvas-container">
    <canvas @click="handleClick($event)" ref="canvas" id="canvas" width="560" height="560"></canvas>
  </section>
</template>

<script lang="ts">
import { PieceType } from '../checkers'

export default {
  props: ['game', 'onClickBoard'],
  name: 'CanvasBoard',

  data() {
    return {
      ctx: null as CanvasRenderingContext2D | null,
      squareSize: 50,
      numRows: 8,
      numCols: 8
    }
  },
  mounted() {
    this.drawBoard()
  },
  methods: {
    drawBoard() {
      const parentWidth = this.$el.clientWidth
      const canvas = this.$refs.canvas as HTMLCanvasElement
      canvas.width = parentWidth
      canvas.height = parentWidth

      const tileSize = canvas.width / 8

      const colors = ['#779954', '#e9edcc']

      this.ctx = canvas.getContext('2d')
      if (!this.ctx) return
      if (this.ctx) this.ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          // Draw the checkerboard pattern
          const colorIndex = (row + col) % 2
          this.ctx.fillStyle = colors[colorIndex]
          this.ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize)

          // Mark the selected piece
          if (
            this.game.selectedPiece &&
            this.game.selectedPiece.coord.i !== -1 &&
            this.game.selectedPiece.coord.j !== -1
          ) {
            const borderSize = 5
            const borderOffset = borderSize / 2
            const selectedX = this.game.selectedPiece.coord.j * tileSize
            const selectedY = this.game.selectedPiece.coord.i * tileSize

            this.ctx.strokeStyle = '#f4f680'
            this.ctx.lineWidth = borderSize
            this.ctx.strokeRect(
              selectedX + borderOffset,
              selectedY + borderOffset,
              tileSize - borderSize,
              tileSize - borderSize
            )
          }

          // Draw checker pieces
          const piece = this.game.board.board[row][col]
          if (piece) {
            const pieceX = col * tileSize + tileSize / 2
            const pieceY = row * tileSize + tileSize / 2
            const radius = tileSize / 2.5
            const pieceColor =
              piece.name === PieceType.Black
                ? 'black'
                : piece.name === PieceType.BlackKing
                  ? 'black'
                  : 'white'

            if (piece.name === PieceType.BlackKing || piece.name === PieceType.WhiteKing)
              this.drawKingPiece(this.ctx, pieceX, pieceY, radius, pieceColor)
            else {
              this.drawCheckerPiece(this.ctx, pieceX, pieceY, radius, pieceColor)
            }
          }
        }
      }
    },
    drawCheckerPiece(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      color: string
    ) {
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
      ctx.closePath()
    },
    drawKingPiece(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      color: string
    ) {
      // Draw the king's crown (triangle)
      ctx.beginPath()
      ctx.moveTo(x, y - radius * 0.7)
      ctx.lineTo(x - radius * 0.3, y - radius * 0.2)
      ctx.lineTo(x + radius * 0.3, y - radius * 0.2)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()

      // Draw the king's body (circle)
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
      ctx.closePath()

      // Draw the king's symbol (sigma)
      ctx.font = `${radius * 1}px Arial`
      ctx.fillStyle = 'red'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('👑', x, y)
    },

    handleClick(ev: MouseEvent) {
      const parentWidth = this.$el.clientWidth
      const canvas = this.$refs.canvas as HTMLCanvasElement
      canvas.width = parentWidth
      canvas.height = parentWidth

      const tileSize = canvas.width / 8

      const rect = canvas.getBoundingClientRect()
      const mouseX = ev.clientX - rect.left
      const mouseY = ev.clientY - rect.top

      const clickedCol = Math.floor(mouseX / tileSize)
      const clickedRow = Math.floor(mouseY / tileSize)

      this.onClickBoard(ev, { i: clickedRow, j: clickedCol })
      this.drawBoard()
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  width: 600px;
  canvas {
    border-radius: 15px;
  }
}
</style>
