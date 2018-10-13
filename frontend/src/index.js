import Vue from 'vue';
window.Vue = Vue;

// Use Vuex
import store from './store.js';

// Use Vue Routing (as defined in router.js)
import router from './router.js';

// Import Main Application Component
import App from './components/App.vue';


// Import global styles and material design
import './styles/variables.scss';
import './styles/fonts.scss';
import './styles/tags.scss';

import 'material-icons/iconfont/material-icons.css';

// VueSax (CSS and Components)
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
Vue.use(Vuesax);

// Feather Icons
// For some reason, I do not need this declaration, probably because I import vue-feather-icon in other places
// import VueFeatherIcon from 'vue-feather-icon';
// Vue.use(VueFeatherIcon);

// Perfect Scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

// Mount Vue Instance to the DOM
new Vue({
  el: '#content',
  router: router,
  store: store,
  mode: 'history',
  render: h => h(App)
});
