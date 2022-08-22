<template>
  <div id="app">
    <router-view/>
    <Qrcode/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Qrcode from '@/components/Qrcode.vue';

  @Component({
    components: {Qrcode},
  })
  export default class App extends Vue {}
</script>

<style lang="scss">
  @import "~@/assets/styles/reset.scss";
  @import "~@/assets/styles/helper.scss";

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $color-black;
    font-family: $font-hei;
    line-height: 1.5;
    font-size: 16px;
    background-color: rgb(245,246,248);

    @media (pointer: fine) {
      max-width: 500px;
      margin: 0 auto;
    }
  }
</style>
