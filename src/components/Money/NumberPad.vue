<template>
  <div class="numberPad">
    <div>上一次的结果为：{{result000}}</div>
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent(1)">1</button>
      <button @click="inputContent(2)">2</button>
      <button @click="inputContent(3)">3</button>
      <button @click="backspace">删除</button>
      <button @click="inputContent(4)">4</button>
      <button @click="inputContent(5)">5</button>
      <button @click="inputContent(6)">6</button>
      <button @click="addStr('-')">-</button>
      <button @click="inputContent(7)">7</button>
      <button @click="inputContent(8)">8</button>
      <button @click="inputContent(9)">9</button>
      <button @click="addStr('+')">+</button>
      <button @click="clearContent">清空</button>
      <button @click="inputZero">0</button>
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
    result000 = 0;

    get output() {
      return this.outputX + this.str + this.outputY;
    }

    // 数字键
    inputContent(input: number) {
      this.clearZero();
      this.str ? this.outputY += input : this.outputX += input;
    }

    // 0键
    inputZero(){
      if(this.str){
        if(this.outputY.indexOf('0') !== 0){
          return this.inputContent(0)
        }else if(this.outputY.indexOf('.') > 0){
          return this.inputContent(0)
        }
      }else{
        if(this.outputX.indexOf('0') !== 0){
          return this.inputContent(0)
        }else if(this.outputX.indexOf('.') > 0){
          return this.inputContent(0)
        }
      }
    }

    // 默认为 `0.0`，要在输入数字前把 `0.0` 清空
    clearZero() {
      if (this.outputX === '0') {
        this.outputX = '';
      }
    }

    // +/-键
    addStr(str: string) {
      const temp = this.calculate();
      if (this.str && temp) {
        this.clearContent();
        this.outputX = '' + temp;
        this.str = str;
      } else if (this.outputX !== '0' && !this.str) {
        this.str = str;
      }
    }

    // 小数点键
    addDot() {
      if (!this.str && this.outputX.indexOf('.') === -1) {
        this.outputX += '.';
      } else if (this.str && this.outputY && this.outputY.indexOf('.') === -1) {
        this.outputY += '.';
      }
    }

    // 删除键
    backspace() {
      if(this.outputY){
        this.outputY = this.outputY.substring(0, this.outputY.length-1)
      }else if(this.str){
        this.str = this.str.substring(0, this.str.length-1)
      }else if(this.outputX.length > 1) {
        this.outputX = this.outputX.substring(0, this.outputX.length-1)
      }
    }

    // 清空键
    clearContent() {
      this.outputX = '0';
      this.str = '';
      this.outputY = '';
    }

    calculate() {
      const x = parseFloat(this.outputX);
      if (!this.str) {
        return parseFloat(this.outputX);
      }
      const y = parseFloat(this.outputY);
      if (this.str === '+') {
        return x + y;
      } else if (x - y < 0) {
        return;
      } else {
        return x - y;
      }
    }

    outputResult() {
      if (this.calculate()) {
        this.result000 = this.calculate();
        this.clearContent();
      }
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