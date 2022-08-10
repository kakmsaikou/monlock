<template>
  <Layout class-prefix="layout">
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
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
    <div>
      <label class="notes">
        <input type="text" placeholder="点此输入备注…">
      </label>
    </div>
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>-</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>+</button>
        <button>清空</button>
        <button>0</button>
        <button>.</button>
        <button>OK</button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  export default {
    name: 'money',
  };
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

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

  .notes {
    font-size: 14px;
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

    }
  }

  .numberPad {
    .output {
      background-color: #f5f5f5;
      font-size: 36px;
      font-family: Consolas, monospace;
      padding-left: 16px;
      padding-right: 16px;
      text-align: right;
      color: $color-red;
      line-height: 1;
    }

    .buttons {
      background-color: #f5f5f5;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      $w: 100vw;
      padding-top: $w/45;

      > button {
        width: $w*2/9;
        height: $w*13/108;
        line-height: $w*13/108;
        margin-bottom: $w/45;
        border: none;
        background-color: white;
        border-radius: 9px;
        font-size: 20px;

        &:last-child{
          background-color: $color-red;
          color: white;
        }
      }
    }
  }
</style>