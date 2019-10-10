import Vue from "vue";
window.Vue = Vue;

import store from "@/store/store.js";
import router from "@/router.js";
import App from "@/App.vue";

// import styles
import "@/styles/global.scss";
import "@/styles/fonts.scss";
import "material-icons/iconfont/material-icons.css";

new Vue({
  el: "#app",
  router,
  store,
  mode: "history",
  render: h => h(App)
});
