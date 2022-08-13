<template>
  <ul class="types">
    <li :class="type==='-'&&'selected'" @click="selectType.call(null,'-')">支出</li>
    <li :class="type==='+'&&'selected'" @click="selectType.call(null,'+')">收入</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
    type = '-'; // '-'表示支出，'+'表示收入

    selectType(type: string): undefined {
      if (['-', '+'].indexOf(type) < 0) {
        throw new Error('type is unknown');
      }
      this.type = type;
      return;
    }

    // 为了防止反复点击 收入/支出 多次触发同一个事件，使用 watch 更好
    @Watch('type')
    onTypeChange(val:'string'): undefined{
      this.$emit('update:value',val)
      return
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