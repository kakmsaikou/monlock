<template>
  <Layout class-prefix="layout">
    <Types/>
    <Tags :data-source.sync="tags"/>
    <Notes/>
    <NumberPad/>
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Notes from '@/components/Money/Notes.vue';

  export default {
    name: 'money',
    components: {Notes, Tags, Types, NumberPad},
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    data(){
      return{
        tags: ['衣','食','住','行']
      }
    }
  };
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>

<style lang="scss" scoped>
</style>