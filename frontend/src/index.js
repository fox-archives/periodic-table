// Import all the global styles (shared by all Vue components)
import './styles/global-styles.scss'

// Import Material Library (Used by VueSax)
import 'material-icons/iconfont/material-icons.css'

// VueJS
import Vue from 'vue'
window.Vue = Vue  // Assign Vue to window object in index.js; Vue() is now a global property of the window object

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
import VueFeatherIcon from 'vue-feather-icon'
Vue.use(VueFeatherIcon)

import App from 'Components/App.vue'
import router from 'Components/router.js'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
