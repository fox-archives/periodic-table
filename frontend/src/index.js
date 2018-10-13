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
// import { vsButton, vsSelect, vsPopup } from 'vuesax/dist/components';
// import vsButton from 'vuesax/dist/components/vsButton.vue';
// import vsSelect from 'vuesax/dist/components/vsSelect.vue';
// import vsPopup from 'vuesax/dist/components/vsPopup.vue';
import 'vuesax/dist/vuesax.css';
Vue.use(Vuesax);
// Vue.use(vsButton);
// Vue.use(vsSelect);
// Vue.use(vsPopup);

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
