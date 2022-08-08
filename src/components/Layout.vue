<template>
  <div class="wrapper">
    <div class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  import Nav from '@/components/Nav.vue';
  export default {
    name: 'Layout',
    components: {Nav}
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    border: 1px solid green;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .content {
    flex-grow: 1;
    overflow: auto;
  }
</style>