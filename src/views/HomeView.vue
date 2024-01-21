<template>
  <HeaderCmp />
  <BoardCmp :board="game.board.board"></BoardCmp>
</template>

<script lang="ts">
import BoardCmp from '../cmps/BoardCmp.vue'
import HeaderCmp from '../cmps/HeaderCmp.vue'
import { Game } from '../checkers/index'

export default {
  props: [],
  name: 'HomeView',
  created() {
    // this.game.board.board[0][0]?.move({ i: 0, j: 3 })
    // this.game.setSelectedPiece(this.game.board.board[0][0])
  },

  data() {
    return {
      game: new Game()
    }
  },
  components: {
    BoardCmp,
    HeaderCmp
  }
}
</script>

<style lang="scss" scoped></style>
