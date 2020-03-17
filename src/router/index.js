import Vue from 'vue'
import VueRouter from 'vue-router'
import public1 from '../components/public.vue'
import login from '../components/login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/public',
    name: 'public1',
    alias:'/',
    component: public1,
    meta: {secretgarden: false},
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {secretgarden: false},
  },  
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/profile.vue'),
    meta: {secretgarden: true},
  },  
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../components/logout.vue'),
    meta: {secretgarden: false},
  }
]

const router = new VueRouter({
  routes
})

export default router
