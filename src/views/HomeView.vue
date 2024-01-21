<template>
  <h1>Home</h1>
</template>

<script lang="ts">
import { Game } from '../checkers/index'

export default {
  props: [],
  name: 'HomeView',

  data() {
    return {
      game: new Game()
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>
