import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import CanvasLines from '../views/CanvasLines.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/canvas-lines',
    name: 'CanvasLines',
    component: CanvasLines
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
