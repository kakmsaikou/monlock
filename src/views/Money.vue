<template>
  <Layout class-prefix="layout">
    <Types :type.sync="record.type"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <div class="formItem-wrapper">
      <FormItem @update:value="onUpdateNotes" placeholder="点此输入备注..."/>
    </div>
    <NumberPad @update:value="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/FormItem.vue';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';

  @Component({
    components: {FormItem, Tags, Types, NumberPad}
  })
  export default class Money extends Vue {
    recordList = recordListModel.fetch();
    tag = window.tagList;

    record: RecordItem = {
      type: '-',
      tags: [],
      notes: '',
      amount: undefined,
    };

    onUpdateTags(tags: string[]): undefined {
      this.record.tags = tags;
      return;
    }

    onUpdateNotes(value: string): undefined {
      this.record.notes = value;
      return;
    }

    saveRecord(amount: number): undefined {
      this.record.amount = amount;
      this.record.createdAt = new Date();

      recordListModel.created(this.record);
      return;
    }

    @Watch('recordList')
    onRecordListChange(): undefined {
      recordListModel.save();
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
  }
</style>