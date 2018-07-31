import Vue from 'vue'
import VueRouter from 'vue-router'
import PeriodicTable from 'Components/PeriodicTable/PeriodicTable.vue'

Vue.use(VueRouter);

const myRoutes = [
  {
    path: '/',
    component: PeriodicTable
  },
  {
    path: '/simple',
    component: PeriodicTable
  },
  {
    path: '/properties',
    component: PeriodicTable
  },
  {
    path: '/electrons',
    component: PeriodicTable
  },
  {
    path: '/orbitals',
    component: PeriodicTable
  },
  {
    path: '/isotopes',
    component: PeriodicTable
  },
  {
    path: '/explore',
    component: PeriodicTable
  },
  {
    path: '/trivia',
    component: PeriodicTable
  },
  {
    path: '/info',
    component: PeriodicTable
  },
  {
    path: '/options',
    component: PeriodicTable
  },
  {
    path: '/search',
    component: PeriodicTable
  }
];

export default new VueRouter({
  routes: myRoutes,
  mode: 'history'
})
