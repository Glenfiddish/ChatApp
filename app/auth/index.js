/**
 * Created by Edwin on 2017/7/27.
 */
let model = require('../../config/model')
let express = require('express')

const POST = model.Post
const connect =model.connect
let router = express.Router()

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/logout',(req,res)=>{
    res.clearCookie('chatApp')
    res.clearCookie('user_id')
    res.redirect('/auth/login')
})

router.post('/login',(req,res)=>{
    console.log(req.body)
    console.log(req.body.account)

    model.User.find({
        where:{
            account:req.body.account,
            password:req.body.password
        }
    }).then((item)=>{
        if(!item){
            res.render('login')
            res.send({error:'用户不存在！'})
        }else{
            res.cookie('user_id',item.id,{maxAge:60000000})
            res.redirect('/')
        }
    })
})

module.exports = router