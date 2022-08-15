<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';

  // 初始化 tagListModel.data
  tagListModel.fetch();

  @Component
  export default class Labels extends Vue {
    tags = tagListModel.data;

    createTag(): undefined {
      const name = window.prompt('请输入标签名');
      if (name) {
        const message = tagListModel.create(name);
        if (message === 'success') {
          window.alert('添加成功');
        } else if (message === 'duplicated') {
          window.alert('标签名重复');
        }
      }
      return;
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .tags {
    font-size: 16px;
    background-color: white;
    margin: 16px 12px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
    padding-left: 16px;
    padding-right: 16px;

    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgb(242, 242, 242);

      > span {
        //font-weight: bold;
      }

      > .icon {
        width: 18px;
        height: 18px;
        color: #666;
      }
    }
  }

  .createTag {
    background-color: $color-blue;
    color: white;
    border-radius: 4px;
    border: none;
    min-height: 40px;
    padding-left: 16px;
    padding-right: 16px;

    &-wrapper {
      padding-top: 44-16px;
      text-align: center;
    }
  }
</style>