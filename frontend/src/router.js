import Vue from 'vue'
import VueRouter from 'vue-router'
import Body from './views/Body/Body.vue';
import Explore from './views/Explore/Explore.vue';
import Trivia from './views/Trivia/Trivia.vue';

Vue.use(VueRouter);

const myRoutes = [
  {
    path: '/',
    component: Body
  },
  {
    path: '/properties',
    component: Body
  },
  {
    path: '/electrons',
    component: Body
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
