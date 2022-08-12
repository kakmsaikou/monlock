<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="backspace">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="addStr">-</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="addStr">+</button>
      <button @click="clearContent">清空</button>
      <button @click="inputContent">0</button>
      <button @click="addDot">.</button>
      <button @click="outputResult">OK</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    // 1 + 2 → outputX 为 1；str 为 +；outputY 为 2
    outputX = '0';
    str = '';
    outputY = '';

    get output(): string {
      return this.outputX + this.str + this.outputY;
    }

    // 0~9 数字键
    inputContent(event: MouseEvent): undefined {
      // 17位以上不能再加
      if (this.output.length >= 17) {
        return;
      }

      const button = (event.target as HTMLButtonElement);
      const input = button.textContent;

      // '0'不能直接在后面加数字字符串
      if(this.str && this.outputY === '0'){
        return
      }else if (this.outputX === '0'){
        this.outputX = ''+input
        return
      }

      // '1.00'、'1+1.00'不能再加数字
      const temp = this.str ? this.outputY: this.outputX
      if (temp.indexOf('.') > 0 && temp.substring(temp.indexOf('.')).length >= 3) {
        return;
      }

      this.str ? this.outputY += input : this.outputX += input;

      return;
    }

    // +/-键
    addStr(event: MouseEvent): undefined {
      const button = (event.target as HTMLButtonElement);
      if (this.output.length >= 17) {
        return;
      }
      const input = button.textContent;
      const temp = this.calculate();
      if (this.str && temp) {
        this.clearContent();
        this.outputX = '' + temp;
        this.str = ''+input;
      } else if (this.outputX !== '0' && !this.str && this.outputX[this.outputX.length - 1] !== '.') {
        this.str = ''+input;
      }
      return;
    }

    // 小数点键
    addDot(): undefined {
      if (this.output.length >= 17) {
        return;
      }
      if (this.outputY && this.outputY.indexOf('.') < 0) {
        // '1+'、'1+1.'、'1+1.0'不能再加小数点
        this.outputY += '.';
      } else if (!this.str && this.outputX.indexOf('.') < 0) {
        // '1.0'不能加小数点
        // '1+'的时候不能给 outputX 加上小数点
        this.outputX += '.';
      }
      return;
    }

    // 删除键
    backspace(): undefined {
      if (this.outputY) {
        this.outputY = this.outputY.slice(0, -1);
      } else if (this.str) {
        this.str = this.str.slice(0, -1);
      } else {
        this.outputX = this.outputX.slice(0, -1);
        if (!this.outputX) {
          this.outputX = '0';
        }
      }
      return;
    }

    // 清空键
    clearContent(): undefined {
      this.outputX = '0';
      this.str = '';
      this.outputY = '';
      return;
    }

    calculate(): number | undefined {
      const x = parseFloat(this.outputX);
      if (this.str && this.outputY) {
        const y = parseFloat(this.outputY);
        if (this.str === '+') {
          return x + y;
        } else if (x - y < 0) {
          return;
        } else {
          return x - y;
        }
      }
      return parseFloat(this.outputX);
    }

    outputResult(): number | undefined {
      const temp = this.calculate();
      if (temp) {
        console.log(temp);
        this.clearContent();
        return temp;
      }
      return;
    }

  }
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
      height: 36px;
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