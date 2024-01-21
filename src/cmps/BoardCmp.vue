<template>
  <section>
    <table>
      <tbody>
        <tr v-for="(row, i) in board" :key="i">
          <td v-for="(cell, j) in row" :key="j" :class="(i + j) % 2 === 0 ? 'black' : 'white'">
            {{ cell?.name || ' ' }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
export default {
  props: ['board'],
  name: 'BoardCmp',

  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
section {
  border-spacing: 0;

  tbody {
    tr {
      display: flex;
      td {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        font-size: 20px;
        transition: all 0.1s ease-in-out;
        &.white {
          background-color: #f0d9b5;
        }
        &.black {
          background-color: #aa8d78;
        }
      }
    }
  }
}
</style>
