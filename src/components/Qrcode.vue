<template>
<div class="overlay" v-if="pointerFine">
  <div class="center">
    <button class="close" @click="pointerFine = false">
      <Icon name="close"/>
    </button>
    <img src="../assets/qrcode.png" alt="qrcode" class="qrcode">
    <div class="context">
      <p>扫描二维码👆</p>
      <p>在手机上使用体验更佳✨</p>
    </div>
  </div>
</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon},
  })

  export default class Qrcode extends Vue {
    pointerFine = false
    created(){
      if (matchMedia('(pointer:fine)').matches) {
        this.pointerFine = true
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";
  .overlay{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 1;
    transform: translateZ(0);



    > .center{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);

      > .close{
        cursor:pointer;
        background-color: transparent;
        border: none;
        position: absolute;
        right: -20px;
        top: -20px;
        .icon{
          color: #333;
          height: 16px;
          width: 16px;
        }
      }

      > img{
        vertical-align: middle;
        border-style: none;
        height: 400px;
        width: 400px;
      }

      > .context{
        color: white;
        font-size: larger;
        font-weight: bolder;
        background: $color-blue;
        text-align:center;
      }
    }
  }
</style>