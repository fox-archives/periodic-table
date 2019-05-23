import Vue from 'vue';
import VueRouter from 'vue-router';
import Body from './views/body/Body.vue';
import Explore from './views/explore/Explore.vue';
import Trivia from './views/trivia/Trivia.vue';
import propertiesInfo from './components/atom-info/properties-info.vue';
import propertiesVisual from './components/atom-visual/properties-visual.vue';
import electronsVisual from './components/atom-visual/electrons-visual.vue';
import orbitalsVisual from './components/atom-visual/orbitals-visual.vue';

Vue.use(VueRouter);

const myRoutes = [
  {
    path: '/',
    redirect: '/properties'
  },
  {
    path: '/properties',
    component: Body,
    children: [
      {
        path: '',
        components: {
          textualInfo: propertiesInfo,
          visualInfo: propertiesVisual
        }
      }
    ]
  },
  {
    path: '/electrons',
    component: Body,
    children: [
      {
        path: '',
        components: {
          textualInfo: propertiesInfo,
          visualInfo: electronsVisual
        }
      }
    ]
  },
  {
    path: '/orbitals',
    component: Body,
    children: [
      {
        path: '',
        components: {
          textualInfo: propertiesInfo,
          visualInfo: orbitalsVisual
        }
      }
    ]
  },
  {
    path: '/isotopes',
    component: Body,
    children: [
      {
        path: '',
        components: {
          textualInfo: propertiesInfo,
          visualInfo: propertiesVisual
        }
      }
    ]
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
});
