import Vue from 'vue';
import VueRouter from 'vue-router';
import Body from '@/views/TabGenericPeriodicTableInterface';
import Explore from '@/views/TabExplore';
import Trivia from '@/views/TabTrivia';
import atomInfoProperties from '@/components/atom-sidebar/AtomSidebar';
import atomGraphicProperties from '@/components/atom-graphic/AtomGraphicProperties';
import atomGraphicOrbitals from '@/components/atom-graphic/AtomGraphicOrbitals';

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
          'atom-info': atomInfoProperties,
          'atom-graphic': atomGraphicProperties
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
          'atom-info': atomInfoProperties,
          'atom-graphic': atomGraphicProperties
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
          'atom-info': atomInfoProperties,
          'atom-graphic': atomGraphicOrbitals
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
          'atom-info': atomInfoProperties,
          'atom-graphic': atomGraphicOrbitals
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
    path: '/search',
    component: Body
  }
];

export default new VueRouter({
  routes: myRoutes,
  mode: 'history'
});
