// Import all the global styles (shared by all Vue components)
import './styles/global-styles.scss';

// Import Material Library (Used by VueSax)
import 'material-icons/iconfont/material-icons.css';

// VueJS
import Vue from 'vue';
window.Vue = Vue;  // Assign Vue to window object in index.js; Vue() is now a global property of the window object

// VueSax
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' // Gather VueSax styles
Vue.use(Vuesax, {
  theme: {
    colors: {
    }
  }
})

// Feather Icons
import VueFeatherIcon from 'vue-feather-icon';
Vue.use(VueFeatherIcon);

import Navigation from './components/Navigation/Navigation.vue';
import PeriodicTable from './components/PeriodicTable/PeriodicTable.vue';
import Footer from './components/Footer/Footer.vue';


new Vue({
  render: k => k(Navigation)
}).$mount('#navigation-el')

new Vue({
  // Render is method of vue instance, means replace part you are slecting the dom with, with some other code
   render: h => h(PeriodicTable)
 }).$mount('#grid-el')

new Vue({
  render: m => m(Footer)
}).$mount('#footer-el')
