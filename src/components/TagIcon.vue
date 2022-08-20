<template>
  <div class="icon-wrapper">
    <svg class="icon">
      <use v-bind:xlink:href='"#"+name'/>
    </svg>
  </div>
</template>

<script lang="ts">
  export default {
    props: ['name'],
    name: 'Icon'
  };

  // eslint-disable-next-line no-undef
  let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {
    importAll(require.context('../assets/icons/tags', true, /\.svg$/));
  } catch (e) {
    console.log(e);
  }
</script>

<style lang="scss" scoped>
  .icon-wrapper{
    height: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgb(247,247,247);

    .icon{
      fill: currentColor;
      overflow: hidden;
      width: 24px;
      height: 24px;
      color: rgba(125,137,153);
    }
  }

</style>