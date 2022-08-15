<template>
  <Layout>
    <div class="navBar">
      <Icon name="left"/>
      <span>编辑标签</span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="update"
                field-name="标签名"
                placeholder="点此输入标签名..."/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({components: {FormItem, Button}})
  export default class EditLabel extends Vue {
    tag?: Tag = undefined;

    created() {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(t => t.id === id)[0];
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }

    update(name: string) {
      if (this.tag) {
        tagListModel.update(this.tag.id, name);
      }
    }

    remove(){
      if(this.tag){
        const result = tagListModel.remove(this.tag.id)
        if (result){
          alert('删除成功')
          this.$router.replace('/labels');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 16px 16px;
    background-color: $color-blue;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;

    > .icon {
      width: 24px;
      height: 24px;
    }

    > span {
    }

    &::after {
      content: '';
      width: 24px;
      height: 24px;
    }
  }

  .form-wrapper {
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #ffffff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
    margin-top: 20px;
  }

  .button-wrapper {
    padding-top: 44px;
    text-align: center;
  }
</style>