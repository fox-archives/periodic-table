import Vue from 'vue'
import VueRouter from 'vue-router'
import Body from './views/body/Body.vue';
import Explore from './views/explore/Explore.vue';
import Trivia from './views/trivia/Trivia.vue';
import PanelTextualProperties from './components/detailed-element-info/properties-info.vue';
import PanelVisualColor from './components/detailed-element-visual/properties-visual.vue';


Vue.use(VueRouter);

const myRoutes = [
  {
    path: '/',
    redirect: '/properties'
  },
  {
    path: '/properties',
    component: Body,
    children: [{
      path: '',
      components: {
        textualInfo: PanelTextualProperties,
        visualInfo: PanelVisualColor
      }
    }]
  },
  {
    path: '/electrons',
    component: Body,
    children: [{
      path: '',
      components: {
        textualInfo: PanelTextualProperties,
        visualInfo: PanelVisualColor
      }
    }]
  },
  {
    path: '/orbitals',
    component: Body
  },
  {
    path: '/isotopes',
    component: Body
  },
  {
    path: '/explore',
    component: Explore
  },
  {
    path: '/trivia',
    component: Trivia
  },
  {
    path: '/info',
    component: Body
  },
  {
    path: '/options',
    component: Body
  },
  {
    path: '/search',
    component: Body
  }
];

export default new VueRouter({
  routes: myRoutes,
  mode: 'history'
})
