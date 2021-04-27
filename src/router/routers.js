
import { RouterURL } from '@/common/env'

const About = () => import(/* webpackChunkName: "about" */ '@/pages/About')
const Login = () => import(/* webpackChunkName: "commom-login" */ '@/pages/common/Login')
const NotFound = () => import(/* webpackChunkName: "common-NotFound" */ '@/pages/common/NotFound')
const ShopNavigation = () => import(/* webpackChunkName: "common-Navigation" */ '@/pages/shop/Navigation')
const ShopManage = () => import(/* webpackChunkName: "shop-Manage" */ '@/pages/shop/Manage')
const ShopStyle = () => import(/* webpackChunkName: "shop-Style" */ '@/pages/shop/Style')
const ShopPersonal = () => import(/* webpackChunkName: "shop-Personal" */ '@/pages/shop/Personal')
const ShopEdit = () => import(/* webpackChunkName: "shop-Edit" */ '@/pages/shop/Edit')

const Routers = [
  {
    path: RouterURL.index.path,
    name: RouterURL.index.name,
    meta: {
      title: RouterURL.index.title
    },
    redirect: RouterURL.shopEdit.path
  },
  {
    path: RouterURL['*'].path,
    name: RouterURL['*'].name,
    meta: {
      title: RouterURL['*'].title
    },
    component: NotFound
  },
  {
    path: RouterURL.login.path,
    name: RouterURL.login.name,
    meta: {
      title: RouterURL.login.title
    },
    component: Login
  },
  {
    path: RouterURL.about.path,
    name: RouterURL.about.name,
    meta: {
      title: RouterURL.about.title
    },
    component: About
  },
  {
    path: RouterURL.shopEdit.path,
    name: RouterURL.shopEdit.name,
    meta: {
      title: RouterURL.shopEdit.title
    },
    component: ShopEdit
  },
  {
    path: RouterURL.shopManage.path,
    name: RouterURL.shopManage.name,
    meta: {
      title: RouterURL.shopManage.title
    },
    component: ShopManage
  },
  {
    path: RouterURL.shopPersonal.path,
    name: RouterURL.shopPersonal.name,
    meta: {
      title: RouterURL.shopPersonal.title
    },
    component: ShopPersonal
  },
  {
    path: RouterURL.shopStyle.path,
    name: RouterURL.shopStyle.name,
    meta: {
      title: RouterURL.shopStyle.title
    },
    component: ShopStyle
  },
  {
    path: RouterURL.shopNavigation.path,
    name: RouterURL.shopNavigation.name,
    meta: {
      title: RouterURL.shopNavigation.title
    },
    component: ShopNavigation
  }
]

export default Routers
