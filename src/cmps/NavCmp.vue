<template>
  <nav>
    <div class="logo">logo</div>
    <ul>
      <li>Play</li>
      <li>Puzzles</li>
      <li>Learn</li>
    </ul>
    <div>
      <input type="text" placeholder="Search" />
      <button type="button">Sign Up</button>
      <button type="button">Log In</button>
    </div>
    <div>
      <button color="dark">
        <span>x</span>
        <p>English</p>
      </button>
      <button color="dark">
        <span>x</span>
        <p>Light UI</p>
      </button>
      <button color="dark">
        <span>x</span>
        <p>Help</p>
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  props: [],
  name: 'NavCmp',

  data() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
nav {
  width: 20%;
  background-color: #262522;
}
</style>
