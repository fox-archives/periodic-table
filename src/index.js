// index.js

import Vue from 'vue'
import AppComponent from './components/AppComponent.vue'

// This may be formated incorrectly
new Vue({
  // Render is method of vue instance, means replace part you are slecting the dom with, with some other code
   render: h => h(AppComponent)
 }).$mount('#grid')
