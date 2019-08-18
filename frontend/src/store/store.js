import Vue from "vue";
import Vuex from "vuex";
import mainAtomTable from "./modules/table";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mainAtomTable
  }
});
