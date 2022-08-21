<template>
  <div class="wrapper" ref="wrapper">chart</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import * as echarts from 'echarts'

  @Component
  export default class Chart extends Vue {
    @Prop() options?: echarts.EChartsOption
    mounted() {
      if(this.options === undefined){return console.error('options is undefined')}
      const chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
      chart.setOption(this.options)
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper{
  }
</style>