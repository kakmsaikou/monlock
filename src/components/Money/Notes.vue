<template>
  <label class="notes">
    <input type="text" v-model="value" :placeholder="placeholder">
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';

    @Prop() placeholder?: string;

    @Watch('value')
    onValueChange(val: string) :undefined{
      this.$emit('update:value', val);
      return
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .notes {
    font-size: 15px;
    background-color: #f5f5f5;
    padding-left: 16px;
    display: flex;
    align-items: center;

    box-shadow: 0 -2px 2px -2px rgba(0, 0, 0, 0.15);

    input {
      height: 36px;
      flex-grow: 1;
      background-color: transparent;
      border: none;
      padding-right: 16px;
      color: $color-blue;
    }
  }
</style>