import Vue from 'vue'
window.Vue = Vue;
import Router from 'vue-router'
import Home from '@/pages/front-page'
import searchResultsPage from '@/pages/search-results'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/search-results/:passedText,:passedCat',  
      name: 'search-results-page',
      component: searchResultsPage,
    },
    

  ]
})

//:passedText,:passedCat',