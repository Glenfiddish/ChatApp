import Vue from 'vue'
import Router from 'vue-router'
import user from '../components/user'
import post from '../components/post'
import message from '../components/message'
import userItem from '../components/userItem'
import postItem from '../components/postItem'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/user',
      name: '用户',
      component: user,
    },
    {
      path: '/user/:id',
      name: '用户项目',
      component: userItem,
      hidden:true
    },
    {
      path: '/post',
      name: '说说',
      component: post

    },
    {
      path: '/post/:postId',
      name: '说说查看',
      component: postItem
    },
    {
      path: '/user/:id/message/:toId',
      name: '聊天记录',
      component: message
    }

  ]
})
