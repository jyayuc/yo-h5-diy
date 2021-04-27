/* eslint-disable no-undef */
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import { routerMode } from '@/common/env'
import Routers from './routers'

// Vue.use(VueRouter)

const router = new VueRouter({
  mode: routerMode,
  base: process.env.BASE_URL,
  routes: [
    ...Routers
  ]
})

export default router
