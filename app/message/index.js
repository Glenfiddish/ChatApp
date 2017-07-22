/**
 * Created by Edwin on 2017/7/18.
 */

let model = require('../../config/model')
let User = model.User
let redis = model.redis

let express = require('express')
let router = express.Router()

router.get('/:fromId/:toId',function(req,res){
    var resJSON = {}    
    User.findById(req.params.fromId).then((form)=>{
        resJSON.formUserName = form.account
        User.findById(req.params.toId).then((to)=>{
            resJSON.toUserName = to.account
            redis.lrange(req.params.fromId +'_'+ req.params.toId,0,10,(err,list)=>{
               resJSON.list = list
               res.send(resJSON)
            })
        })
    }) 
})

module.exports = router
