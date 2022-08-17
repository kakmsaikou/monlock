import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[]
  },
  mutations: {
    fetchRecords (state){
      return state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      const recordClone: RecordItem = clone(record);
      state.recordList.push(recordClone);
      console.log(state.recordList)
      store.commit('saveRecords')
    },
    saveRecords(state): undefined {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
      return;
    }
  },
});

export default store;
