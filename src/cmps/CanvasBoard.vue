<template>
  <section>
    <canvas @click="handleClick($event)" ref="canvas" id="canvas" width="560" height="560"></canvas>
  </section>
</template>

<script lang="ts">
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
      const tileSize = 70 // Size of each tile
      const colors = ['#d18b47', '#ffce9e'] // Colors for the checkerboard pattern
      const canvas = document.getElementById('canvas') as HTMLCanvasElement
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
            const borderSize = 2 // Width of the border
            const borderOffset = borderSize / 2
            const selectedX = this.game.selectedPiece.coord.j * tileSize
            const selectedY = this.game.selectedPiece.coord.i * tileSize

            this.ctx.strokeStyle = 'red'
            this.ctx.lineWidth = borderSize
            this.ctx.strokeRect(
              selectedX + borderOffset,
              selectedY + borderOffset,
              tileSize - borderSize,
              tileSize - borderSize
            )
          }

          // Draw text at the center of each tile
          const text = this.game.board.board[row][col]?.name || ''
          if (text && this.ctx) {
            this.ctx.font = '40px Arial'
            this.ctx.fillStyle = 'black'
            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'
            this.ctx.fillText(text, col * tileSize + tileSize / 2, row * tileSize + tileSize / 2)
          }
        }
      }
    },
    handleClick(ev: MouseEvent) {
      const tileSize = 70
      const canvas = document.getElementById('canvas') as HTMLCanvasElement

      const rect = canvas.getBoundingClientRect()
      const mouseX = ev.clientX - rect.left
      const mouseY = ev.clientY - rect.top

      const clickedCol = Math.floor(mouseX / tileSize)
      const clickedRow = Math.floor(mouseY / tileSize)

      this.onClickBoard(ev, { i: clickedRow, j: clickedCol })
      this.drawBoard()
    }
  },
  watch: {
    'game.selectedPiece'() {}
  }
}
</script>

<style lang="scss" scoped>
section {
  canvas {
    border: 2px solid rgb(137, 31, 31);
  }
}
</style>
