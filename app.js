/**
 * Created by Edwin on 2017/6/14.
 */
let express = require('express')
let fileUpload = require('express-fileupload')
let path = require('path')
let cors = require('cors')
let bodyParser =require('body-parser')
let app = express()

//json格式化字符缩进
app.set('json spaces', 4)
app.use(cors())
app.use(fileUpload())

//bodyParser设置
app.use(bodyParser({urlencoded:false}))
app.use(bodyParser.json())

// 路由放置

app.get('/',function (req,res) {res.send('hello node')})
app.use('/static',express.static(path.join(__dirname,'static')))
app.use('/user', require('./app/user'))
app.use('/post', require('./app/post'))
app.use('/message', require('./app/message'))

// 上传功能
app.post('/upload',(req,res)=>{
    let file = req.files.file
    let fileName = Date.parse(new Date())+'.'+file.name
    let url = 'http://localhost:3001/static/upload/'+fileName
    file.mv(path.join(__dirname,'static','upload',fileName),(err)=>{
        if(err){
            return res.status(500).send(err)
        }
        res.send({url:url})
    })
})

app.listen(3001,function () {
    console.log('node server run on port 3001')
})
