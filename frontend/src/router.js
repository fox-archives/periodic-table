import Vue from 'vue';
import VueRouter from 'vue-router';
import Body from './views/body/Body.vue';
import Explore from './views/explore/Explore.vue';
import Trivia from './views/trivia/Trivia.vue';
import atomInfoProperties from './components/atom-info/AtomInfo.vue';
import atomGraphicProperties from './components/atom-graphic/AtomGraphicProperties.vue';
import atomGraphicElectrons from './components/atom-graphic/AtomGraphicElectrons.vue';
import atomGraphicOrbitals from './components/atom-graphic/AtomGraphicOrbitals.vue';

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
          textualInfo: atomInfoProperties,
          visualInfo: atomGraphicProperties
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
          textualInfo: atomInfoProperties,
          visualInfo: atomGraphicElectrons
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
          textualInfo: atomInfoProperties,
          visualInfo: atomGraphicOrbitals
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
          textualInfo: atomInfoProperties,
          visualInfo: atomGraphicOrbitals
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
