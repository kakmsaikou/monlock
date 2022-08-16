import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import TagListModel from '@/models/tagListModel';
import tagListModel from '@/models/tagListModel';
import RecordListModel from '@/models/recordListModel';

Vue.config.productionTip = false

Vue.component('Layout', Layout);
Vue.component('Icon', Icon );

// record store
window.recordList = RecordListModel.fetch()

// tag store
window.tagList = TagListModel.fetch()

window.createTag = (name)=>{
  const message = tagListModel.create(name);
  if (message === 'success') {
    window.alert('添加成功');
  } else if (message === 'duplicated') {
    window.alert('标签名重复');
  }
}

window.removeTag = (id)=>{
  return tagListModel.remove(id)
}

window.updateTag = (id, name)=>{
  return tagListModel.update(id, name)
}

window.findTag = (id)=>{
  return window.tagList.filter(t => t.id === id)[0];
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
