<template>
  <div class="nav">
    <router-link to="/labels">
      <svg>
        <use xlink:href="#label"/>
      </svg>
      标签
    </router-link>
    |
    <router-link to="/money">
      记账
    </router-link>
    |
    <router-link to="/statistic">统计</router-link>
  </div>
</template>

<script lang="ts">
  // eslint-disable-next-line no-undef
  let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)

  try {
    importAll(require.context('../assets/icons', true, /\.svg$/))
  }catch (e) {
    console.log(e);
  }

  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
  .nav {
    border: 1px solid red
  }
</style>