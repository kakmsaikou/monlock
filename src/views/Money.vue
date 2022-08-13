<template>
  <Layout class-prefix="layout">
    <Types :type.sync="record.type"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Notes @update:value="onUpdateNotes"/>
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

  // Record 类型声明
  type Record = {
    type: string,
    tags: string[],
    notes: string,
    amount: number | undefined
  }

  @Component({
    components: {Notes, Tags, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];

    record: Record = {
      type: '-',
      tags: [],
      notes: '',
      amount: undefined
    };

    recordList: Record[] = [];

    onUpdateTags(tags: string[]): undefined {
      this.record.tags = tags
      return;
    }

    onUpdateNotes(value: string): undefined {
      this.record.notes = value
      return;
    }

    saveRecord(amount: number): undefined {
      this.record.amount = amount
      const cloneRecord = JSON.parse(JSON.stringify(this.record))
      this.recordList.push(cloneRecord)
      console.log(this.recordList)
      return;
    }

    @Watch('recordList')
    onRecordListChange(){
      window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>

<style lang="scss" scoped>
</style>