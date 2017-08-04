import Vue from 'vue'
import Router from 'vue-router'
import dialog from '../components/dialog.vue'
import homePage from '../components/homePage.vue'
import request from '../components/request.vue'
import loginout from '../components/loginout.vue'
import notFound from '../components/not-found.vue'
import post from '../components/post.vue'
import self from '../components/self.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dialog',
      name: 'dialog',
      component: dialog
    },
    {
      path: '/',
      name: 'homepage',
      component: homePage
    },
    {
      path: '/request',
      name: 'request',
      component: request
    },
    {
      path: '/loginout',
      name: 'loginout',
      component: loginout
    },
    {
      path: '/self',
      name: 'self',
      component: self
    },
    {
      path: '/post',
      name: 'post',
      component: post
    },
    {
      path: '*',
      name: 'notFound',
      component: notFound
    }
  ]
})
