import Vue from 'vue'
import VueRouter from 'vue-router'
import Home2 from '../views/Home2.vue'
import Home from '@/components/Home'
import Chat from '@/components/Chat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home2',
    name: 'Home2',
    component: Home2
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat/:name',
    name: 'Chat',
    component: Chat,
    // accept props
    props: true,
    beforeEnter: (to, from, next) => {
      if (to.params.name) {
        next()
      } else {
        next({ name: 'Home' })
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
