import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import HomePage from '../components/HomePage'
import Product from '../components/Product'
import Catalogue from '../components/Catalogue'
import Particulars from '../components/Particulars'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/product',
      name: 'product',
      component: Product,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: Catalogue,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/particulars',
      name: 'particulars',
      component: Particulars,
      meta: {
        keepAlive: true
      }
    }
  ]
})
