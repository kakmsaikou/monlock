<template>
    <button class="button" @click="$emit('click',$event)">
      <slot/>
    </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .button {
    background-color: $color-blue;
    color: white;
    border-radius: 4px;
    border: none;
    min-height: 40px;
    padding-left: 16px;
    padding-right: 16px;
  }
</style>