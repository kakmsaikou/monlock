<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value" @click="select(item)"
        class="tabs-item" :class="liClass(item)">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = { text: string, value: string }

  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
    @Prop(String) readonly value!: string;
    @Prop(String) classPrefix?: string;

    liClass(item: DataSourceItem) {
      return {
        [this.classPrefix + '-tabs-item']: this.classPrefix,
        selected: item.value === this.value
      };
    }

    select(item: DataSourceItem) {
      this.$emit('update:value', item.value);
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/helper.scss";

  .tabs {
    background-color: $color-blue;
    display: flex;
    text-align: center;
    font-size: 24px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
    color: #7BF;

    &-item {
      width: 50%;
      height: 64px;
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