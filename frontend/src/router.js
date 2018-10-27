import Vue from 'vue'
import VueRouter from 'vue-router'
import Body from './views/body/Body.vue';
import Explore from './views/explore/Explore.vue';
import Trivia from './views/trivia/Trivia.vue';
import propertiesInfo from './components/element-information/properties-information.vue';
import propertiesVisual from './components/element-graphic/properties-graphic.vue';
import electronsVisual from './components/element-graphic/electrons-graphic.vue';
import orbitalsVisual from './components/element-graphic/orbitals-graphic.vue';


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
        textualInfo: propertiesInfo,
        visualInfo: propertiesVisual
      }
    }]
  },
  {
    path: '/electrons',
    component: Body,
    children: [{
      path: '',
      components: {
        textualInfo: propertiesInfo,
        visualInfo: electronsVisual
      }
    }]
  },
  {
    path: '/orbitals',
    component: Body,
    children: [{
      path: '',
      components: {
        textualInfo: propertiesInfo,
        visualInfo: orbitalsVisual
      }
    }]
  },
  {
    path: '/isotopes',
    component: Body,
    children: [{
      path: '',
      components: {
        textualInfo: propertiesInfo,
        visualInfo: propertiesVisual
      }
    }]
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
