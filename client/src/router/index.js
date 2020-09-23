import { createRouter, createWebHashHistory } from 'vue-router'

import store from '../store'

import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Main from '../views/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    beforeEnter: (to, from, next) => {
      if (!store.state.isAuthenticated) {
        next({ name: 'Home' })
      } else {
        next()
      }
    },
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
