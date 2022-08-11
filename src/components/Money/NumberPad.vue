<template>
  <div class="numberPad">
    <div class="output">0.0</div>
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
</template>

<script lang="ts">
  export default {
    name: 'NumberPad'
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/helper.scss";

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

        &:last-child {
          background-color: $color-red;
          color: white;
        }
      }
    }
  }
</style>