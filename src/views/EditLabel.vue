<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" @click.native="goBack"/>
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
  import FormItem from '@/components/FormItem.vue';
  import Button from '@/components/Button.vue';
  import store from '@/store/index2';

  @Component({components: {FormItem, Button}})
  export default class EditLabel extends Vue {
    tag = store.findTag(this.$route.params.id)

    created() {
      if(!this.tag){
        this.$router.replace('/404');
      }
    }

    goBack() {
      this.$router.back();
    }

    update(name: string) {
      if (this.tag) {
        store.updateTag(this.tag.id, name);
      }
    }

    remove() {
      if (this.tag) {
        if (store.removeTag(this.tag.id)) {
          alert('删除成功');
          this.$router.back();
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