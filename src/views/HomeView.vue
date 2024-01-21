<template>
  <BoardCmp :board="game.board.board"></BoardCmp>
</template>

<script lang="ts">
import BoardCmp from '../cmps/BoardCmp.vue'
import { Game } from '../checkers/index'

export default {
  props: [],
  name: 'HomeView',

  data() {
    return {
      game: new Game()
    }
  },
  components: {
    BoardCmp
  }
}
</script>

<style lang="scss" scoped></style>
