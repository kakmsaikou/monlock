<template>
  <Layout class-prefix="layout">
    <Types @update:value="onUpdateType"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Notes @update:value="onUpdateNotes"/>
    <NumberPad @update:value="onUpdateAmount"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Notes from '@/components/Money/Notes.vue';

  @Component({
    components: {Notes, Tags, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];

    onUpdateType(type: string):undefined{
      console.log(type)
      return
    }

    onUpdateTags(tags: string):undefined{
      console.log(tags)
      return
    }

    onUpdateNotes(value: string):undefined{
      console.log(value)
      return
    }

    onUpdateAmount(amount: number):undefined{
      console.log(amount)
      return
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