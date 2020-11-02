import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index.html',
  },
  {
    path: '/index.html',
    name: 'Home',
    component: Home
  }
  // ,
  // {
  //   path: '/webSocket',
  //   name: 'webSocket',
  //   component: () => import(/* webpackChunkName: "webSocket" */ '@views/webSocket.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: process.env.VUE_APP_PUBLIC_PATH,
  routes
})

export default router
