/**
 * Created by Edwin on 2017/7/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import request from 'superagent'
Vue.use(Vuex)

const defaultId = 1
const host = '//localhost:3001/'

const store = new Vuex.Store({
  state:{
    posts:[],
    friends:[],
    self:[]
  },
  getters:{
    friends:(state)=>state.friends,
    posts:(state)=>state.posts,
    self:(state)=>state.self
  },
  mutations:{
    set_friends:(state,list)=>state.friends=list,
    set_posts:(state,list)=>state.posts=list
  },
  actions:{
    fetch_friends({commit}){
      request.get(host+'user/'+defaultId+'/friend').end((err,res)=>{
        commit('set_friends',res.body)
      })
    },
    fetch_posts({commit}){
      request.get(host+'post/user/'+defaultId).end((err,res)=>{
        commit('set_posts',res.body)
      })
    }
  }
})

export default store
