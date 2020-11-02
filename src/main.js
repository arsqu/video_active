import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from '@router'
import store from '@store'
import axios from '@util/action'
import util from '@util/util'
import 'amfe-flexible'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$util = util
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
