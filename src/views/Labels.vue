<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component({
    components: {Button},
  })
  export default class Labels extends mixins(TagHelper){
    get tags(){
      return this.$store.state.tagList
    }

    created(){
      this.$store.commit('fetchTags')
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .tags {
    font-size: 16px;
    background-color: white;
    margin: 16px 12px 0;
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

  .createTag-wrapper {
      padding-top: 44px;
      text-align: center;
  }
</style>