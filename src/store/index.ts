import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';
import initTag from '@/constants/initTag';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: undefined,
    createRecordError: null,
    createTagError: null
  } as RootState,

  mutations: {
    // recordStore
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const recordClone = clone(record);
      state.recordList.push(recordClone);
      store.commit('saveRecords');
      window.alert('已保存');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },

    // tagStore
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (state.tagList.length === 0 && !window.localStorage.getItem('_idMax')) {
        // store.commit('createTag', '衣');
        // store.commit('createTag', '食');
        // store.commit('createTag', '住');
        // store.commit('createTag', '行');
        const initTagList = initTag
        console.log(initTagList.length)
        for(let i = 0;i<initTagList.length ; i++){
          store.commit('createTag', initTagList[i]);
        }
      }
    },
    createTag(state, payload: { name: string, icon: string }) {
      const {name, icon} = payload;
      store.state.createTagError = null;
      const names = state.tagList.map(item => item.name);
      if (name.length > 10) {
        state.createTagError = new Error('tag name length is overflow');
        window.alert('标签名过长');
        return;
      }
      if (!name) {
        state.createTagError = new Error('tag name is empty');
        window.alert('标签名不能为空');
        return;
      }
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated');
        window.alert('标签名重复');
        return;
      }
      state.tagList.push({id: createId().toString(), name: name, icon: icon});
      // 不能把 window.alert('创建成功') 写这，会导致初始化时弹窗
      store.commit('saveTags');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    updateTag(state, payload: { id: string, name: string, icon: string }) {
      const {id, name, icon} = payload;
      const tag = state.tagList.filter(item => item.id === id)[0];
      if (name.length > 10) {
        state.createTagError = new Error('tag name length is overflow');
        window.alert('标签名过长');
        return;
      }
      if (tag) {
        const names = state.tagList.map(item => item.name);
        if (!name) {
          window.alert('标签名不能为空');
          return;
        }
        if (tag.name !== name && names.indexOf(name) >= 0) {
          window.alert('标签名重复');
        } else {
          tag.name = name;
          tag.icon = icon;
          store.commit('saveTags');
          window.alert('保存成功');
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        window.alert('删除成功');
        router.back();
      } else {
        window.alert('删除失败');
      }
    },

    // currentTag
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    }
  },
});

export default store;
