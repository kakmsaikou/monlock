<template>
  <div class="tags">
    <ul class="currentTags">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
    <div class="newTag">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Tags'
  };
</script>

<style lang="scss" scoped>
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

      height: 100%;
      flex: 1;

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