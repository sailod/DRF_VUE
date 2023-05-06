import HomePage from '@/views/HomePage.vue'
import AddNewsPage from '@/views/AddNewsPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import { createRouter as _createRouter, createWebHistory } from 'vue-router'

export function createRouter() {
  return _createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: HomePage,
      },
      {
        path: '/login',
        name: 'Login',
        component: LoginPage,
      },
      {
        path: '/add-news',
        name: 'AddNewsPage',
        component: AddNewsPage,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/AboutPage.vue'),
      },
    ],
  })
}
