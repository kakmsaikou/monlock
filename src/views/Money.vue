<template>
  <Layout class-prefix="layout">
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <Tags :selected-tag.sync="record.tag"/>
    <div class="formItem-wrapper">
      <FormItem :value.sync="record.notes" placeholder="点此输入备注..."/>
      <input class="createdAt" type="date"
             :value="formatDate(record.createdAt)"
             @input="record.createdAt=formatDate($event.target.value)">
    </div>
    <NumberPad @update:value="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/FormItem.vue';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';

  @Component({
    components: {FormItem, Tags, NumberPad, Tabs},
  })
  export default class Money extends Vue {
    get recordList() {
      return this.$store.state.recordList;
    }

    record: RecordItem = {
      type: '-',
      tag: {id: '', name: '', icon: ''},
      notes: '',
      amount: undefined,
      createdAt: new Date().toISOString()
    };

    formatDate(isoString: string) {
      return dayjs(isoString).format('YYYY-MM-DD');
    }

    recordTypeList = recordTypeList;

    initRecordItem() {
      this.record.notes = '';
      this.record.tag = this.$store.state.tagList[0];
      this.record.amount = undefined;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    created() {
      this.$store.commit('fetchRecords',);
      this.$store.commit('fetchTags',);
      this.initRecordItem();
    }

    saveRecord(amount: number) {
      this.record.amount = amount;
      this.record.createdAt = this.record.createdAt || new Date().toISOString();
      if (this.$store.state.createRecordError === null) {
        this.$store.commit('createRecord', this.record);
        this.initRecordItem();
      }
      return;
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
    background-color: white;
  }
</style>

<style lang="scss" scoped>
  .formItem-wrapper {
    background-color: #f5f5f5;
    box-shadow: 0 -2px 2px -2px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;

    .createdAt {
      border: none;
      font-size: 14px;
      background-color: transparent;
      color: #999;
      padding-right: 10px;
    }
  }
</style>