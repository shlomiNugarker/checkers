<template>
  <HeaderCmp />
  <BoardCmp :board="game.board.board" :onClickBoard="onClickBoard"></BoardCmp>
</template>

<script lang="ts">
import BoardCmp from '../cmps/BoardCmp.vue'
import HeaderCmp from '../cmps/HeaderCmp.vue'
import { Game } from '../checkers/index'
import { type Coord } from '../checkers/models/Coord'
import { Piece } from '../checkers/Piece'

export default {
  props: [],
  name: 'HomeView',
  created() {
    // this.game.board.board[0][0]?.move({ i: 3, j: 3 })
    // console.log(this.game.board.board[2][2]?.getPossibleMoves())
    // this.game.setSelectedPiece(this.game.board.board[0][0])
  },

  data() {
    return {
      game: new Game()
    }
  },

  methods: {
    onClickBoard(ev: MouseEvent, coord: Coord) {
      this.game.onClickBoard(coord)
    }
  },

  watch: {
    'game.selectedPiece'(newVal: Piece | null) {
      const els = document.querySelectorAll('.selected')
      els.forEach((el) => el.classList.remove('selected'))

      if (newVal) {
        const el = document.querySelector(`#cell-${newVal?.coord.i}-${newVal?.coord.j}`)
        el?.classList.add('selected')
      }
    }
  },
  components: {
    BoardCmp,
    HeaderCmp
  }
}
</script>

<style lang="scss" scoped></style>
