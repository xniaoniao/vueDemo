// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

import './common/index.scss';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

// Vuex 进行状态管理
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    seller: {},
    linkBorderIndex: '',
    goods: {}
  },
  mutations: {
    changeLinkBorderIndex(state, index) {
      state.linkBorderIndex = index;
    }

  },
  actions: {
    getSellerData({commit, state}) {
      return Vue.axios.get('/api/seller').then(res => {
        if (res.data.error === 0) {
          state.seller = res.data.data;
        }
      });
    },
    getGoodsData({commit, state}) {
      return Vue.axios.get('/api/goods').then(res => {
        if (res.data.error === 0) {
          state.goods = res.data.data;
        }
      });
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
