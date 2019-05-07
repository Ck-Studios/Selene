// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import SuiVue from 'semantic-ui-vue';
import { store } from './vuex/store';
import 'expose-loader?$!expose-loader?jQuery!jquery'

Vue.use(SuiVue);
Vue.config.productionTip = false;

Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
