import './css/main.scss';

import './js/blur.js';

// VueJS
import Vue from 'vue';
// Assign Vue to window object in index.js; Vue() is now a global property of the window object
window.Vue = Vue;

import Navigation from './components/Navigation.vue';
import Options from './components/Options.vue';
import PeriodicTable from './components/PeriodicTable.vue';
import Footer from './components/Footer.vue';

// Element UI
import ElementUI from './element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// This may be formated incorrectly
new Vue({
  render: k => k(Navigation)
}).$mount('#navigation-el')

new Vue({
  render: j => j(Options)
}).$mount('#options-el')

new Vue({
  // Render is method of vue instance, means replace part you are slecting the dom with, with some other code
   render: h => h(PeriodicTable)
 }).$mount('#grid-el')

new Vue({
  render: m => m(Footer)
}).$mount('#footer-el')
