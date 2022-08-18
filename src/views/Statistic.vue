<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <div>type: {{ type }}</div>
    <div>interval: {{ interval }}</div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Types from '@/components/Money/Types.vue';
  import Tabs from '@/components/Tabs.vue';
  import {Component} from 'vue-property-decorator';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Types, Tabs},
  })
  export default class statistic extends Vue {
    type = '-';
    recordTypeList = recordTypeList;

    interval = 'day';
    intervalList = intervalList;
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