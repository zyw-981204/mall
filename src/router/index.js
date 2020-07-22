import Vue from 'vue'
import VueRouter from 'vue-router'

const Profile = () => import('@/views/profile/profile')
const Cart = () => import('@/views/cart/cart')
const Home = () => import('@/views/home/home')
const CateGory = () => import('@/views/category/category')
const NotFound = () => import('@/views/notfound/notfound')
const MainTabBar = () => import('@/components/content/MainTabBar/MainTabBar')
const Details = () => import('@/views/Details/Details')
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/category',
      name: 'category',
      component: CateGory
    },
    {
      path: '/maintabbar',
      name: 'maintabbar',
      component: MainTabBar
    },
    {
      path: '/details/:iid',
      name: 'Details',
      component: Details
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})

export default router
