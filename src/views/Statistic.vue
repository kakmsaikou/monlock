<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
    <div>type: {{type}}</div>
    <div>interval: {{interval}}</div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Types from '@/components/Money/Types.vue';
  import Tabs from '@/components/Tabs.vue'
  import {Component} from 'vue-property-decorator';

  @Component({
    components: {Types, Tabs},
  })
  export default class statistic extends Vue {
    type = '-';
    typeList = [{text:'支出',value:'-'},{text:'收入',value:'+'}]

    interval = 'day'
    intervalList = [{text:'按天',value:'day'},{text:'按周',value:'week'},{text:'按月',value:'mouth'}]
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  ::v-deep .type-tabs-item {
    background-color: white;

    &.selected {
      background-color: $color-blue;

      &::after {
        display: none;
      }
    }
  }

</style>