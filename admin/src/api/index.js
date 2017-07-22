/**
 * Created by Edwin on 2017/6/17.
 */
import {host} from '../config'
import request from 'superagent'

/**
 * 获取所有用户
 * @param cb
 */
let getAllUser = (cb)=>{
  request.get(host+'user')
    .end((err,res)=>{
      cb(res.body)
    })
}

/**
 * 获取说说
 * @param cb
 */
let getPost = (cb)=>{
  request.get(host+'post')
    .end((err,res)=>{
      cb(res.body)
    })
}

/**
 * 获取用户详细信息页面api
 * @param id
 * @param cb
 */
let getUserDetail = (id,cb)=>{
  request.get(host+'user/'+id+'/detail')
    .end((err,res)=>{
      cb(res.body)
    })
}

/**
 * 增加post
 * @param data
 * @param cb
 */
let addPost = (data,loginUserId,cb)=>{
  request.post(host+'post/'+ loginUserId+'/addPost')
    .send(data)
    .end((err,res)=>{
      cb(res.body)
    })
}

/**
 * 修改post
 * @param data
 * @param cb
 */
let editPost =(data,cb)=>{
  request.patch(host+'post/'+data.postId+'/editPost')
    .send(data)
    .end((err,res)=>{
      cb(res.body)
    })
}

/**
 * 删除post
 * @param postId
 * @param cb
 */
let deletePost=(postId,cb)=>{
  request.delete(host+'post/'+postId+'/deletePost')
    .end((err,res)=>{
      cb(res.body)
    })
}

/**
 * 增加朋友
 * @param loginUserId
 * @param addFriendObj
 * @param cb
 */
let addFrid=(loginUserId,addFriendObj,cb)=>{
  request.post(host+'user/'+loginUserId+'/addFriend')
    .send(addFriendObj)
    .end((err,res)=>{
      cb(res.body)
    })
}

/**
 * 聊天记录获取
 * @param fromId
 * @param toId
 * @param cb
 */
let getMessage=(fromId,toId,cb)=>{
  request.get(host+'message/'+fromId+'/'+toId)
    .end((err,res)=>{
    cb(res.body)
  })
}

/**
 * 说说详细获取
 * @param postId
 * @param cb
 */
let getPostDetail = (postId,cb)=>{
  request.get(host+'post/'+ postId)
    .end((err,res)=>{
      cb(res.body)
    })
}

let editUser = (userId,obj,cb)=>{
  request.patch(host+'user/'+ userId)
    .send(obj)
    .end((err,res)=>{
      cb(res.body)
    })
}

export {
  getAllUser,
  getPost,
  getUserDetail,
  deletePost,
  editPost,
  addPost,
  addFrid,
  getMessage,
  getPostDetail,
  editUser
}



