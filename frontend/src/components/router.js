import Vue from 'vue'
import VueRouter from 'vue-router'
import PeriodicTable from 'Components/PeriodicTable/PeriodicTable.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: PeriodicTable
    }
  ]
})
