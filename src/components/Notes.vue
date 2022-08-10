<template>
  <div>
    <label class="notes">
      <input type="text" placeholder="点此输入备注…">
    </label>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Notes'
  };
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    background-color: #f5f5f5;
    padding-left: 16px;
    display: flex;
    align-items: center;

    box-shadow: 0 -2px 2px -2px rgba(0, 0, 0, 0.15);

    input {
      height: 36px;
      flex-grow: 1;
      background-color: transparent;
      border: none;
      padding-right: 16px;

    }
  }
</style>