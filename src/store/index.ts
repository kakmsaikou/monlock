import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // 把 store 绑到 Vue.prototype 上

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state, n) {
      state.count += n; // 无法用this
    }
  },
});

store.commit('increment', 10);

export default store;
