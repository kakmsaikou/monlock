<template>
  <ul class="types">
    <li :class="type==='-'&&'selected'" @click="selectType.call(null,'-')">支出</li>
    <li :class="type==='+'&&'selected'" @click="selectType.call(null,'+')">收入</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
    @Prop(String)readonly type!: string;

    selectType(newType: string): undefined {
      if (['-', '+'].indexOf(newType) < 0) { // '-'表示支出，'+'表示收入
        throw new Error('type is unknown');
      }
      this.$emit('update:type',newType)
      return;
    }
  }
</script>


<style lang="scss" scoped>
  @import "@/assets/styles/helper.scss";

  .types {
    background-color: $color-blue;
    display: flex;
    text-align: center;
    font-size: 24px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
    color: #7BF;

    > li {
      width: 50%;
      $h: 64px;
      height: $h;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected {
        color: white;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: white;
        }
      }
    }
  }
</style>