import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class TagHelper extends Vue{
  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {
      window.alert('标签名不能为空');
      return;
    }
    this.$store.commit('createTag', name);
    if(this.$store.state.createRecordError === null){
      window.alert('添加成功')
    }
    return;
  }
}

export default TagHelper