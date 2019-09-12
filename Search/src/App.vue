
<template>
  <div id="mainDiv">
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() { 
    return {
      
    }
  },
  methods: {
    
    }
  }
   

</script>

<style scoped>
{
@import './stylesheets/front-page/main-front-page.css';
}
{
@import './stylesheets/search-results/main-search-results.css';
}
</style>
