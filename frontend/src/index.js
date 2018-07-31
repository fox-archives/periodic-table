import Vue from 'vue';

// Use Vuex
import store from './store.js';

// Use Vue Routing (as defined in router.js)
import router from 'Components/router.js';

// Import Main Application Component
import App from 'Components/App.vue';


// Import global styles and material design
import './styles/global-styles.scss';
import 'material-icons/iconfont/material-icons.css';

// VueSax (CSS and Components)
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax);

// Feather Icons
import VueFeatherIcon from 'vue-feather-icon';
Vue.use(VueFeatherIcon);

// Mount Vue Instance to the DOM
new Vue({
  router: router,
  store: store,
  mode: 'history',
  render: h => h(App)
}).$mount('#app');
