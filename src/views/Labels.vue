<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <tag-icon class="left" :name="tag.icon"/>
        <span>{{ tag.name }}</span>
        <Icon class="right" name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button>
        <router-link :to="`/labels/create`">
          <span>创建标签</span>
        </router-link>
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  // TODO
  // 封装删除标签和创建标签按钮/抽离编辑标签页和创建标签页的共有属性

  @Component({
    components: {Button},
  })
  export default class Labels extends mixins(TagHelper) {
    get tags() {
      return this.$store.state.tagList;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    created() {
      this.$store.commit('fetchTags');
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .tags {
    font-size: 16px;
    background-color: white;
    margin: 16px 12px 80px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
    padding-left: 16px;
    padding-right: 16px;

    > .tag {
      min-height: 52px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 1px solid rgb(242, 242, 242);

      > .left::v-deep {
        background-color: rgb(234, 244, 253);

        .icon {
          color: $color-blue
        }
      }

      > span {
        padding-left: 10px;
        flex-grow: 10;
      }

      > .right {
        width: 18px;
        height: 18px;
        color: #666;
        flex-grow: 0
      }
    }
  }

  .createTag-wrapper {
    position: fixed;
    bottom: 72px;
    right: 50%;
    transform: translateX(50%);
    box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.20);
  }
</style>