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
      <button @click="inputContent">-</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="inputContent">+</button>
      <button @click="clearContent">清空</button>
      <button @click="inputContent">0</button>
      <button @click="inputContent">.</button>
      <button @click="confirmContent">OK</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    // 1 + 2，outputX为1、str为+、outputY为2
    outputX = '';
    str = '';
    outputY = '';

    created(): undefined {
      this.clearContent();
      return;
    }

    get output(): string {
      return this.outputX + this.str + this.outputY;
    }

    // 0~9、+-、.键
    inputContent(event: MouseEvent): undefined {
      // 17位以上不能再加
      if (this.output.length >= 17) {
        return;
      }

      const input = '' + (event.target as HTMLButtonElement).textContent;

      if ('0123456789'.indexOf(input) >= 0) {
        // '0'不能直接在后面加数字字符串
        if (this.str && this.outputY === '0') {
          return;
        }

        // 10-10+ → 0+ 不能把新数加到outputX上、不能在outputY=0后还执行替换操作
        if (this.outputX === '0') {
          if (this.str) {
            if (this.outputY === '') {
              this.outputY = input;
              return;
            }
          } else {
            this.outputX = input;
            return;
          }
        }

        // '1.00'、'1+1.00'不能再加数字
        const temp = this.str ? this.outputY : this.outputX;
        if (temp.indexOf('.') > 0 && temp.substring(temp.indexOf('.')).length >= 3) {
          return;
        }

        this.str ? this.outputY += input : this.outputX += input;
      }

      if ('+-'.indexOf(input) >= 0) {
        const temp = this.calculate();
        // 10-10 的情况下不能再减号
        if (temp === '0' && input === '-') {
          return;
        }
        if (this.str && this.outputY && temp) {
          this.clearContent();
          this.outputX = temp;
          this.str = input;
        } else if (this.outputX !== '0' && !this.str && this.outputX[this.outputX.length - 1] !== '.') {
          this.str = input;
        }
      }

      if ('.'.indexOf(input) >= 0) {
        if (this.outputY && this.outputY.indexOf('.') < 0) {
          // '1+'、'1+1.'、'1+1.0'不能再加小数点
          this.outputY += '.';
        } else if (!this.str && this.outputX.indexOf('.') < 0) {
          // '1.0'不能加小数点
          // '1+'的时候不能给 outputX 加上小数点
          this.outputX += '.';
        }
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

    calculate(): string | undefined {
      const x = parseFloat(this.outputX);
      let y = 0;
      if (this.outputY) {
        y = parseFloat(this.outputY);
      }
      if (this.str === '-') {
        return x - y >= 0 ? (x - y).toString() : undefined;
      } else {
        return (x + y).toString();
      }
    }

    confirmContent(): undefined {
      const temp = this.calculate();
      // 1-1 时应该清空 Content
      if (temp === '0') {
        this.clearContent();
        return;
      }
      if (temp) {
        this.$emit('update:value', parseFloat(temp));
        this.clearContent();
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
      // TODO
      //@media (pointer: fine) {
      //  padding-top: 11.1px;
      //}


      > button {
        width: $w*2/9;
        height: $w*13/108;
        line-height: $w*13/108;
        margin-bottom: $w/45;
        border: none;
        background-color: white;
        border-radius: 9px;
        font-size: 20px;

        // TODO
        //@media (pointer: fine) {
        //  width: 111.1px;
        //  height: 60.1px;
        //  line-height: 61.1px;
        //  margin-bottom: 11.1px;
        //}

        &:last-child {
          background-color: $color-red;
          color: white;
        }
      }
    }
  }
</style>