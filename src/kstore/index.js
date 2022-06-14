import Vue from "vue";
import Vuex from "./kvuex";

Vue.use(Vuex);

console.log({ Vuex });

export default new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    doubleCount: (state) => {
      return state.count * 2;
    },
  },
  mutations: {
    addCount(state) {
      state.count++;
    },
  },
  actions: {
    asyncAddCount({ commit }) {
      setTimeout(() => {
        commit("addCount");
      }, 1000);
    },
  },
  modules: {},
});
