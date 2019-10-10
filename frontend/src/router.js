import Vue from "vue";
import VueRouter from "vue-router";
import TabGenericPeriodicTableInterface from "@/views/TabGenericPeriodicTableInterface";
import Explore from "@/views/TabExplore";
import Trivia from "@/views/TabTrivia";
import atomSidebar from "@/components/atom-sidebar/AtomSidebar";
import atomGraphicProperties from "@/components/atom-graphic/AtomGraphicProperties";
import atomGraphicOrbitals from "@/components/atom-graphic/AtomGraphicOrbitals";

Vue.use(VueRouter);
console.log(Explore);

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
          "atom-sidebar": atomSidebar,
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
          "atom-sidebar": atomSidebar,
          "atom-graphic": atomGraphicProperties
        }
      }
    ]
  },
  {
    path: "/orbitals",
    name: "Orbitals",
    // component: TabGenericPeriodicTableInterface,
    // children: [
    //   {
    //     path: "",
    //     name: "Orbitals",
    //     components: {
    //       "atom-sidebar": atomSidebar,
    //       "atom-graphic": atomGraphicOrbitals
    //     }
    //   }
    // ]
    component: {
      render: h => {
        return h(
          "div",
          {
            style: {
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              paddingBottom: "30vh"
            }
          },
          [ h("h1", "'Orbitals' coming soon") ]
        )
      }
    }
  },
  {
    path: "/isotopes",
    name: "Isotopes",
    // component: TabGenericPeriodicTableInterface,
    // children: [
    //   {
    //     path: "",
    //     name: "Isotopes",
    //     components: {
    //       "atom-sidebar": atomSidebar,
    //       "atom-graphic": atomGraphicOrbitals
    //     }
    //   }
    // ]
    component: {
      render: h => {
        return h(
          "div",
          {
            style: {
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              paddingBottom: "30vh"
            }
          },
          [ h("h1", "'Isotopes' coming soon") ]
        )
      }
    }
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
