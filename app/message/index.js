/**
 * Created by Edwin on 2017/7/18.
 */

let model = require('../../config/model')
let User = model.User
let redis = model.redis

let express = require('express')
let router = express.Router()

router.get('/:fromId/:toId',function(req,res){
    redis.lrange(req.params.fromId+'_'+req.params.toId,0,-1,(err,list)=>{
        // console.log(list)
        list = list.map(item=>{

            return JSON.parse(item)
        })
        list = list.sort((a,b)=>{
            return a.timeStamp > b.timeStamp
        })
        res.send(list)
    })
})

module.exports = router
