import Vue from 'vue'
import VueRouter from 'vue-router'

import Navigation from './components/navigation/Navigation.vue';
import Footer from './components/footer/Footer.vue';

import Body from './views/Body.vue';
import Explore from './views/explore/Explore.vue';
import Trivia from './views/trivia/Trivia.vue';
import propertiesInfo from './components/element-information/properties-information.vue';
import propertiesVisual from './components/element-graphic/properties-graphic.vue';
import electronsVisual from './components/element-graphic/electrons-graphic.vue';
import orbitalsVisual from './components/element-graphic/orbitals-graphic.vue';

import About from './components/about/about.vue';
import Feedback from './components/feedback/feedback.vue';


Vue.use(VueRouter);

const myRoutes = [
  {
    path: '/',
    redirect: '/properties'
  },
  {
    path: '/properties',
    components: {
      default: Body,
      navigation: Navigation

    },
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
    components: {
      default: Body,
      navigation: Navigation
    },
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
    components: {
      default: Body,
      navigation: Navigation
    },
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
    components: {
      default: Body,
      navigation: Navigation
    },
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
    components: {
      default: Explore,
      navigation: Navigation
    }
  },
  {
    path: '/trivia',
    components: {
      default: Trivia,
      navigation: Navigation
    }
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
  },
  {
    path: '/about',
    components: {
      default: About
    }
  },
  {
    path: '/feedback',
    components: {
      default: Feedback
    }
  }
];

export default new VueRouter({
  routes: myRoutes,
  mode: 'history'
})
