<template>
  <div class="tags">
    <ul class="currentTags">
      <li v-for='tag in dataSource' :key="tag" @click="toggle.call(null,tag)"
          :class="{selected: selectedTags.indexOf(tag) >= 0}">{{ tag }}
      </li>
    </ul>
    <div class="newTag">
      <button @click="create">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop(Array) readonly dataSource: string[] | undefined;
    selectedTags: string[] = [];

    toggle(tag: string): undefined {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      return;
    }

    create(): undefined {
      const name = window.prompt('请输入标签名');
      if (name === '') {
        window.alert('标签名不能为空');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      } else if (this.dataSource && this.dataSource.indexOf(name!) < 0) {
        this.$emit('update:dataSource', [...this.dataSource, name]);
      }
      return;
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .tags {
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    height: 100%;

    flex: 1 1 0;
    overflow: auto;

    > .currentTags {
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
      order: 1;
      align-items: end;

      &::-webkit-scrollbar {
        display: none; /*ChromeSafari*/
      }

      > li {
        $h: 24px;
        background-color: #d9d9d9;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-left: 5px;
        margin-right: 5px;
        margin-top: 4px;

        &.selected {
          background-color: rgb(234, 244, 253);
          color: $color-blue;
        }
      }
    }

    > .newTag {
      padding-top: 16px;
      order: 0;

      button {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid;
        color: #999;
        padding: 0 3px;
      }
    }
  }
</style>