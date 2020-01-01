import Vue from "vue";
import Vuex from "vuex";
import mainAtomTable from "./modules/mainAtomTable";
import modals from "./modules/modals";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mainAtomTable,
    modals
  }
});
