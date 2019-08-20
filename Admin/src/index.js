import Vue from 'vue';
window.Vue = Vue;
import App from './App.vue';
import moment from 'moment';
Vue.prototype.moment = moment

export default new Vue({
  el: '#root',
  render: (h) => h(App),
});