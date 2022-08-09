<template>
  <nav>
    <router-link to="/labels" class="item">
      <Icon name="labels"/>
      标签
    </router-link>
    <router-link to="/money" class="item">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/statistic" class="item">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
  export default {
    name: 'Nav',
  };
</script>

<style lang="scss" scoped>
  nav {
    display: flex;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    font-size: 12px;
    color: #999;
    > .item {
      padding: 2px 0;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon{
        width: 32px;
        height: 32px;
      }
    }
  }
</style>