<template>
  <div class="tags">
    <ul class="currentTags">
      <li v-for='tag in tagList' :key="tag.id" @click="toggleTag(tag)"
          :class="{selected: selectedTag.id === tag.id}">
        <tag-icon :name="tag.icon"/>
        <span>{{ tag.name }}</span>
      </li>
    </ul>
    <div class="newTag">
      <button @click="createTag">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component
  export default class Tags extends mixins(TagHelper) {
    get tagList() {
      return this.$store.state.tagList;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    created() {
      this.$store.commit('fetchTags');
    }

    @Prop() selectedTag!: Tag;

    toggleTag(tag: Tag): undefined {
      this.$emit('update:selected-tag', tag);
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
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 20%;
      }

      .selected::v-deep {
        .icon-wrapper{
          background-color: rgb(234, 244, 253);
          .icon {
            color: $color-blue
          }
        }
        color: $color-blue;
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