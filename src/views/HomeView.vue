<template>
  <section>
    <HeaderCmp />
    isBlackTurn: {{ game.isBlackTurn }}
    <!-- <BoardCmp :board="game.board.board" :onClickBoard="onClickBoard"></BoardCmp> -->
    <CanvasBoard :game="game" :onClickBoard="onClickBoard"></CanvasBoard>
  </section>
</template>

<script lang="ts">
// import BoardCmp from '../cmps/BoardCmp.vue'
import CanvasBoard from '../cmps/CanvasBoard.vue'
import HeaderCmp from '../cmps/HeaderCmp.vue'
import { Game } from '../checkers/index'
import { type Coord } from '../checkers/models/Coord'
import { Piece } from '../checkers/Piece'

export default {
  props: [],
  name: 'HomeView',
  created() {},

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
    // BoardCmp,
    CanvasBoard,
    HeaderCmp
  }
}
</script>

<style lang="scss" scoped>
section {
  min-height: 90vh;
}
</style>
