<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" @click.native="goBack"/>
      <span>编辑标签</span>
      <button @click="commitUpdate">保存</button>
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag.name"
                @update:value="update"
                field-name="标签名"
                placeholder="点此输入标签名..."/>
      <ul>
        <li v-for="item in iconName" :key="item"
            :class="{selected: tempTagIcon === item}"
            @click="updateIcon(item)">
          <tag-icon :name="item"/>
        </li>
      </ul>
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
  import iconName from '@/constants/iconName';

  @Component({
    components: {FormItem, Button},
  })
  export default class EditLabel extends Vue {
    get currentTag() {
      return this.$store.state.currentTag;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    created() {
      this.$store.commit('fetchTags');
      this.$store.commit('setCurrentTag', this.$route.params.id);
      if (!this.currentTag) {
        this.$router.replace('/404');
      }
      this.tempTagName = this.currentTag.name;
      this.tempTagIcon = this.currentTag.icon;
    }

    tempTagName?: string
    tempTagIcon =  'sports'

    iconName = iconName;

    goBack() {
      this.$router.back();
    }

    update(name: string) {
      this.tempTagName = name;
    }

    remove() {
      if (this.currentTag) {
        this.$store.commit('removeTag', this.currentTag.id);
      }
    }

    commitUpdate() {
      if (this.currentTag) {
        this.$store.commit('updateTag', {
          id: this.currentTag.id,
          name: this.tempTagName,
          icon: this.tempTagIcon});
      }
    }

    updateIcon(iconName: string) {
      this.tempTagIcon = iconName;
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

    > button {
      content: '';
      width: 30px;
      height: 24px;
      font-size: 14px;
      line-height: 1;
      border: none;
      background: none;
      color: white;
      padding-top: 4px;
    }
  }

  .form-wrapper {
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #ffffff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
    margin-top: 20px;

    ul {
      display: flex;
      flex-wrap: wrap;
      margin-left: 10px;
      margin-right: 10px;
      padding-bottom: 20px;

      li {
        padding-top: 10px;
        padding-bottom: 10px;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;

        &.selected::v-deep .icon-wrapper {
          background-color: rgb(234, 244, 253);

          .icon {
            color: $color-blue
          }
        }
      }
    }
  }

  .button-wrapper {
    padding-top: 44px;
    text-align: center;
    ::v-deep > button{
      background-color: $color-red;
    }
  }
</style>