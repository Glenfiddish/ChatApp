/**
 * Created by Edwin on 2017/6/14.
 */

let model = require('../../config/model')
let sequelize = require('sequelize')
const Post = model.Post
const Star = model.Star
const Comment = model.Comment
const connect = model.connect
let express = require('express')
let router = express.Router()

//all posts
router.get('/',(req,res)=>{
    let findOption = {
        order: sequelize.literal('createdAt DESC')
    }
    if(req.query.offset && req.query.limit){
      findOption['offset'] = Number(req.query.offset)
      findOption['limit'] = Number(req.query.limit)
    }
    Post.findAll(findOption).then((post)=>{
        res.send(post)
    })
})

//posts detail
router.get('/:postId',(req,res)=>{
   Post.findById(req.params.postId).then(post=>{
        connect.query('SELECT c.*,l.account FROM comments as c  left join login_users as l on l.id = c.loginUserId where postId = ?',{model:Comment,replacements:[req.params.postId]})
        .then(comments=>{
            post.dataValues.comments = comments
            connect.query('SELECT s.*,l.account FROM stars as s  left join login_users as l on l.id = s.loginUserId where postId = ?',{model:Star,replacements:[req.params.postId]})
            .then(stars=>{
                 post.dataValues.stars = stars
                 res.send(post)
            })
        })
   })
})

//add post
router.post('/:loginUserId/addPost',(req,res)=>{
      Post.create({
        loginUserId : req.params.loginUserId,
        title : req.body.title,
        content : req.body.content,
      }).then((item)=>{
        res.send(item)
      })
})
//edit post
router.patch('/:postId/editPost',(req,res)=>{
      Post.findById(req.params.postId)
      .then(post=>{
        post.update(req.body)
          .then((item)=>{
            res.send(item)
          })
    })
})

//delete post
router.delete('/:postId/deletePost',(req,res)=>{
      Post.findById(req.params.postId)
      .then(post=>{
          post.destroy()
              .then((item)=>{
                  res.send(item)
              })
      })
})

//get user && friend post
router.get('/user/:id',async (req,res)=>{
    let userPost = await connect
        .query(
            'select p.title,p.id,p.content,p.image,p.createdAt,p.loginUserId,l.account,IFNULL(l.logo,"http://localhost:3001/static/upload/noPhoto.png") as logo,'+
            'c.`comment`,lc.account as commentAccount,lc.id as commentId,ls.account as starAccount,ls.id as starId from posts as p '+
            'LEFT JOIN login_users as l on l.id=p.loginUserId '+
            'LEFT JOIN (stars s LEFT JOIN login_users as ls on ls.id = s.loginUserId) on s.postId = p.id '+
            'LEFT JOIN (comments  c LEFT JOIN login_users as lc on lc.id = c.loginUserId) on c.postId = p.id '+
            'where p.loginUserId = 2 or '+
            'p.loginUserId in (SELECT friendId from relations where loginUserId = 2) '+
            'or p.loginUserId in (SELECT loginUserId from relations where friendId = 2) order by createdAt desc',{model:Post,replacements:[req.params.id,req.params.id,req.params.id]})
    let resJson = await arrDum(userPost)
    res.send(resJson)
})

let arrDum = (userPost)=>{
    // 获取comment
    let comments = []
    for(let i of userPost){
        i.dataValues.commentId && comments.push({"postId":i.dataValues.id,"commentId":i.dataValues.commentId,"comment":i.dataValues.comment,"account":i.dataValues.commentAccount})
    }

    comments = comments.reduce(function (pre, current, index) {
        pre[current.postId] = pre[current.postId] || []
        if(!pre[current.postId].find((obj)=>{
            return obj.commentId == current.commentId
        })){
             pre[current.postId].push(current)
        }
        return pre
    }, {})
    
    // 获取star
    let stars = []
    for(let i of userPost){
        i.dataValues.commentId && stars.push({"postId":i.dataValues.id,"account":i.dataValues.starAccount,"starId":i.dataValues.starId})
    }

    stars = stars.reduce(function (pre, current, index) {
        pre[current.postId] = pre[current.postId] || []
        if(!pre[current.postId].find((obj)=>{
            return obj.starId == current.starId
        })){
             pre[current.postId].push(current)
        }
        return pre
    }, {})

    //去重
    let arr = []
    
    for(let i of userPost){
        let obj = {}
        obj.id = i.dataValues.id
        obj.title = i.dataValues.title
        obj.logo = i.dataValues.logo
        obj.content = i.dataValues.content
        obj.image = i.dataValues.image
        obj.createdAt = i.dataValues.createdAt
        obj.loginUserId = i.dataValues.postUserId
        obj.account = i.dataValues.account
        if(!arr.find((obj)=>{
            return obj.id == i.id 
        })){
            comments[obj.id] ? (obj.comment = comments[obj.id]) :(obj.comment = [])
            stars[obj.id] ? (obj.stars = stars[obj.id]) : (obj.stars = [])
            arr.push(obj)
        }
    }
    return arr
}

module.exports = router

