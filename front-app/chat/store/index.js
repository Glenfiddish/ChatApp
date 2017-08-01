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
      self:[],
      message:[],
      me:window.user,
      you:''
  },
  getters:{
      friends:(state)=>state.friends,
      posts:(state)=>state.posts,
      self:(state)=>state.self,
      message:(state)=>state.message,
      me:(state)=>state.me,
      you:(state)=>state.you
  },
  mutations:{
      set_friends:(state,list)=>state.friends=list,
      set_posts:(state,list)=>state.posts=list,
      set_message:(state,list) =>state.message=list,
      send_message:(state,item)=>{
          state.message.push(item)
      },
      set_me:(state,obj)=>{
          // console.log(obj.logo)
          let me = obj
          state.me = me
      },
      set_you:(state,obj)=>{
          state.you=obj
      },
  },
  actions:{
      fetch_friends({commit}){
          request.get(host+'user/'+window.user.id+'/friend').end((err,res)=>{
            commit('set_friends',res.body)
          })
      },
      fetch_posts({commit}){
          request.get(host+'post/user/'+window.user.id).end((err,res)=>{
            commit('set_posts',res.body)
          })
      },
      fetch_message({commit},query){
          request
              .get(host+'message/'+query.fromId+'/'+query.toId)
              // .query(query)
              .end((err, res) => {
                  commit('set_message', res.body)
              })
      }
  }
})

export default store
