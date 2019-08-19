import Vue from "vue";
import VueRouter from "vue-router";
import TabGenericPeriodicTableInterface from "@/views/TabGenericPeriodicTableInterface";
import Explore from "@/views/TabExplore";
import Trivia from "@/views/TabTrivia";
import atomInfoProperties from "@/components/atom-sidebar/AtomSidebar";
import atomGraphicProperties from "@/components/atom-graphic/AtomGraphicProperties";
import atomGraphicOrbitals from "@/components/atom-graphic/AtomGraphicOrbitals";

Vue.use(VueRouter);

const myRoutes = [
  {
    path: "/",
    redirect: "/properties"
  },
  {
    path: "/properties",
    component: TabGenericPeriodicTableInterface,
    children: [
      {
        path: "",
        name: "Properties",
        components: {
          "atom-info": atomInfoProperties,
          "atom-graphic": atomGraphicProperties
        }
      }
    ]
  },
  {
    path: "/electrons",
    component: TabGenericPeriodicTableInterface,
    children: [
      {
        path: "",
        name: "Electrons",
        components: {
          "atom-info": atomInfoProperties,
          "atom-graphic": atomGraphicProperties
        }
      }
    ]
  },
  {
    path: "/orbitals",
    component: TabGenericPeriodicTableInterface,
    children: [
      {
        path: "",
        name: "Orbitals",
        components: {
          "atom-info": atomInfoProperties,
          "atom-graphic": atomGraphicOrbitals
        }
      }
    ]
  },
  {
    path: "/isotopes",
    component: TabGenericPeriodicTableInterface,
    children: [
      {
        path: "",
        name: "Isotopes",
        components: {
          "atom-info": atomInfoProperties,
          "atom-graphic": atomGraphicOrbitals
        }
      }
    ]
  },
  {
    path: "/explore",
    name: "Explore",
    component: Explore
  },
  {
    path: "/trivia",
    name: "Trivia",
    component: Trivia
  }
];

export default new VueRouter({
  routes: myRoutes,
  mode: "history"
});
