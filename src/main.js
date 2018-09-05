// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import './common/css/icon.css'

Vue.prototype.$Axios = Axios
Axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5b743b7eee973f101f9e9815/example'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
