<template>
  <Layout class-prefix="layout">
    <Types :type.sync="record.type"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Notes @update:value="onUpdateNotes" placeholder="点此输入备注..."/>
    <NumberPad @update:value="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Notes from '@/components/Money/Notes.vue';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';

  @Component({
    components: {Notes, Tags, Types, NumberPad}
  })

  export default class Money extends Vue {
    recordList = recordListModel.fetch();
    tags = tagListModel.fetch();

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

      const cloneRecord: RecordItem = recordListModel.clone(this.record);
      this.recordList.push(cloneRecord);
      return;
    }

    @Watch('recordList')
    onRecordListChange(): undefined {
      recordListModel.save(this.recordList);
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
</style>