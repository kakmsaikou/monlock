<template>
  <Layout class-prefix="layout">
    <Types/>
    <Tags/>
    <Notes/>
    <NumberPad/>
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/NumberPad.vue';
  import Types from '@/components/Types.vue';
  import Tags from '@/components/Tags.vue';
  import Notes from '@/components/Notes.vue';
  export default {
    name: 'money',
    components: {Notes, Tags, Types, NumberPad},
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