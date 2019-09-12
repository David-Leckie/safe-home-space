// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router: Router,
  components: { App },
  template: '<App/>',
  
})
