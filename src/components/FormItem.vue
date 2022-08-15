<template>
  <label class="formItem">
    <span class="name" v-if="fieldName">{{ fieldName }}</span>
    <input type="text" :value="value" @input="onValueChange($event.target.value)" :placeholder="placeholder">
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    @Prop({default: ''}) readonly value!: string;

    @Prop() fieldName?: string;

    @Prop() placeholder?: string;

    onValueChange(val: string): undefined {
      this.$emit('update:value', val);
      return;
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .formItem {
    font-size: 15px;
    //background-color: #f5f5f5;
    padding-left: 16px;
    display: flex;
    align-items: center;

    .name {
      padding-right: 5px;
    }

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