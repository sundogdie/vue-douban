// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios=axios
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import './common/css/reset.styl'
Vue.use(VueLazyLoad,{
  loading:require('../static/20.gif')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:c=>{
    return c(App)
  }
})
