// index.js
import './css/main.scss';

import Vue from 'vue';
import PeriodicTable from './components/PeriodicTable.vue';
import Options from './components/Options.vue';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';




// This may be formated incorrectly
new Vue({
  // Render is method of vue instance, means replace part you are slecting the dom with, with some other code
   render: h => h(PeriodicTable)
 }).$mount('#grid')

new Vue({
  render: j => h(Options)
}).$mount('#options-el')
