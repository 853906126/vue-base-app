import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
      },
      {
        path: 'todo',
        name: 'todo',
        component: () => import('@/views/todo/index'),
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/index'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
