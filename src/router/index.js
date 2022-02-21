import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../Login.vue'
import Search from '../Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { 
    path: '/loginwithtoken', 
    name: 'loginwithtoken', 
    component: Login 
  },
  { 
    path: '/search', 
    name: 'search', 
    component: Search 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
