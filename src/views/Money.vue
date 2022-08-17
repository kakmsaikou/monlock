<template>
  <Layout class-prefix="layout">
    <Types :type.sync="record.type"/>
    <Tags/>
    <div class="formItem-wrapper">
      <FormItem @update:value="onUpdateNotes" placeholder="点此输入备注..."/>
    </div>
    <NumberPad @update:value="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/FormItem.vue';

  @Component({
    components: {FormItem, Tags, Types, NumberPad},
  })
  export default class Money extends Vue {
    get recordList() {
      return this.$store.state.recordList;
    }

    record: RecordItem = {
      type: '-',
      tags: [],
      notes: '',
      amount: undefined,
    };

    created() {
      this.$store.commit('fetchRecords',);
    }

    onUpdateNotes(value: string): undefined {
      this.record.notes = value;
      return;
    }

    saveRecord(amount: number): undefined {
      this.record.amount = amount;
      this.record.createdAt = new Date();
      this.$store.commit('createRecord', this.record);
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