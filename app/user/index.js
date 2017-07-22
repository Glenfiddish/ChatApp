/**
 * Created by Edwin on 2017/6/14.
 */

let model = require('../../config/model')
let sequelize = require('sequelize')

const User = model.User
const connect = model.connect
let express = require('express')
let router = express.Router()

//all user
router.get('/',(req,res)=>{
    if(req.query.offset && req.query.limit){
        User.findAll({
            'offset': Number(req.query.offset),
            'limit': Number(req.query.limit),
            order: sequelize.literal('createdAt DESC')
        }).then((users)=>{
            res.send(users)
        })
    }else{
        User.findAll({
            order: sequelize.literal('createdAt DESC')
        }).then((users)=>{
            res.send(users)
        })
    }
})

//update user
router.patch('/:id',(req,res)=>{
    User.findById(req.params.id).then(userItem=>{
        userItem.update(req.body)
        .then(updated=>{
            res.send(updated)
        })
    })
// 同步写法   
// router.patch('/:id',async (req,res)=>{
//     let item = await User.findById(req.params.id)
//     let obj = await item.update(req.body)
//     res.send(obj)
})

//id friend otherUser post
router.get('/:id/detail',(req,res)=>{
    User.findById(req.params.id)
      .then(item=>{
            connect.query('SELECT * FROM posts where loginUserId = ?' ,{model:model.Post,replacements:[req.params.id]}
        ).then((list)=>{
              item.dataValues.post = list
              connect.query('SELECT * from login_users where id in (SELECT friendId from relations where loginUserId = ?) or id in (SELECT loginUserId from relations where friendId = ?)',{model:model.User,replacements:[req.params.id,req.params.id]}
            ).then((friend)=>{
                item.dataValues.friend = friend
                connect.query('SELECT * FROM login_users where id != ?' ,{model:model.User,replacements:[req.params.id]}
              ).then((otherUser)=>{
                  item.dataValues.otherUser = otherUser
                  res.send(item)
              })
            })
          })
        })
  })

//search friend
router.get('/:id/friend',async (req,res)=>{
    let item = await connect.query('SELECT ifnull(logo,"//localhost:3001/static/upload/noPhoto.png") as logo,id,account from login_users where id in (SELECT friendId from relations where loginUserId = ?) or id in (SELECT loginUserId from relations where friendId = ?)',{model:model.User,replacements:[req.params.id,req.params.id]})
    res.send(item)
})

//add friend
router.post('/:loginUserId/addFriend',(req,res)=>{
  model
    .Relation.create({
        loginUserId : req.params.loginUserId,
        friendId : req.body.friendId
    }).then((item)=>{
        User.findById(req.body.friendId)
          .then(user=>{
            res.send(user)
          })
    })
})

module.exports = router
