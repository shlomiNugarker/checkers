<template>
  <section class="home-container">
    <NavCmp />
    <div class="board-container">
      <UserPreviewCmp />
      <CanvasBoard :game="game" :onClickBoard="onClickBoard"></CanvasBoard>
      <UserPreviewCmp />
    </div>
    <ControllerCmp />
  </section>
</template>

<script lang="ts">
import CanvasBoard from '../cmps/CanvasBoard.vue'
import NavCmp from '../cmps/NavCmp.vue'
import ControllerCmp from '../cmps/ControllerCmp.vue'
import UserPreviewCmp from '../cmps/UserPreviewCmp.vue'
import { Game } from '../checkers/index'
import { type Coord } from '../checkers/models/Coord'

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

  components: {
    CanvasBoard,
    NavCmp,
    ControllerCmp,
    UserPreviewCmp
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
