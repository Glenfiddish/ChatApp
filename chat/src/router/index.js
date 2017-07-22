import Vue from 'vue'
import Router from 'vue-router'
import dialog from '../components/dialog.vue'
import friend from '../components/friend.vue'
import login from '../components/login.vue'
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
      path: '/friend',
      name: 'friend',
      component: friend
    },
    {
      path: '/login',
      name: 'login',
      component: login
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
