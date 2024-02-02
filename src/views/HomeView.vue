<template>
  <section class="home-container">
    <div class="board-container">
      <CanvasBoard :game="game" :onClickBoard="onClickBoard"></CanvasBoard>
    </div>
  </section>
</template>

<script lang="ts">
import CanvasBoard from '../cmps/CanvasBoard.vue'

import { Game } from '../checkers/index'
import { type Coord } from '../checkers/models/Coord'

export default {
  props: [],
  name: 'HomeView',

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

  components: {
    CanvasBoard
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  padding: 10px;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .board-container {
    display: flex;
    width: 50%;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
  }
}
</style>
