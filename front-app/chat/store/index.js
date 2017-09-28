/**
 * Created by Edwin on 2017/7/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import request from 'superagent'
Vue.use(Vuex)

const host = '//localhost:3001/'

const store = new Vuex.Store({
  state:{
      posts:[],
      friends:[],
      self:[],
      message:[],
      me:window.user,
      you:'',
      searchUser:[],
      requests:[],
      unread:{
          requests:{
              unread:0
          }
      }
  },
  getters:{
      friends:(state)=>state.friends,
      posts:(state)=>state.posts,
      self:(state)=>state.self,
      message:(state)=>state.message,
      me:(state)=>state.me,
      you:(state)=>state.you,
      searchUser:(state)=>state.searchUser,
      requests:(state)=>state.requests
  },
  mutations:{
      set_friends:(state,list)=>state.friends=list,
      set_posts:(state,list)=>state.posts=list,
      set_message:(state,list) =>state.message=list,
      set_search_user:(state,list)=>state.searchUser = list,
      set_me:(state,list)=>state.me = list,
      set_you:(state,list)=>state.you = list,
      set_requests:(state,list)=>state.requests = list,
      send_message:(state,item)=>{
          state.message.push(item)
      },
      add_request:(state,item)=>{
          state.requests.push(item)
          state.unread.requests.count = state.unread.requests.count+1
      },
      add_unread:(state,obj)=>{
          state.friends = state.friends.map((f)=>{
              if(f.id==obj.from){
                  f.unread ++
              }
              return f
          })
      },
      clear_unread:(state,obj)=>{
          state.friends = state.friends.map((f)=>{
              if(f.id == obj.from){
                  f.unread = 0
              }
              return f
          })
      }
  },
  actions:{
      fetch_friends({state,commit}){
          request.get(host+'user/'+state.me.id+'/friend').end((err,res)=>{
              res.body=res.body.map((obj)=>{
                  obj.unread = 0
                  return obj
              })
            commit('set_friends',res.body)
          })
      },
      fetch_posts({state,commit}){
          request.get(host+'post/user/'+state.me.id).end((err,res)=>{
              commit('set_posts',res.body)
          })
      },
      fetch_message({state,commit}){
          request
              .get(host+'message/'+state.me.id+'/'+state.you.id)
              .end((err, res) => {
                  commit('set_message', res.body)
              })
      },
      fetch_search_user({commit},obj){
          request
              .post(host+'user/search')
              .query({from:obj.from,query:obj.query})
              .end((err, res) =>{
                  commit('set_search_user', res.body)
              })
      },
      fetch_request({state,commit}){
        request
            .get(host+'user/requests/'+state.me.id)
            .end((err,res)=>{
                commit('set_requests',res.body)
            })
      }
  }
})

export default store
