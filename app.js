/**
 * Created by Edwin on 2017/6/14.
 */
let express = require('express')
let fileUpload = require('express-fileupload')
let path = require('path')
let cors = require('cors')
let bodyParser =require('body-parser')
let app = express()
let model = require('./config/model')
let cookieParser = require('cookie-parser')
let http = require('http').Server(app)
let io = require('socket.io')(http)
let moment = require('moment')

// app.use(cors())
app.use(fileUpload())

//bodyParser设置
app.use(bodyParser({urlencoded:false}))
app.use(bodyParser.json())

app.use(cookieParser())
// 路由放置
app.set('view engine','ejs')

app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/auth',require('./app/auth'))
app.use((req,res,next)=>{
    if(!req.cookies.user_id){
        res.redirect('./auth/login')
    }else{
        model.User.findById(req.cookies.user_id).then(item=>{
            if(item.logo == 'null'){
                item.logo = 'localhost:3001/static/upload/noPhoto.png'
            }
            res.locals.user = item
            next()
        })
    }
})


app.get('/',function (req,res) {res.render('index')})

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

if(process.env.NODE_ENV == "development"){
    //json格式化字符缩进
    app.set('json spaces', 4)
    let webpackMiddleware = require('webpack-dev-middleware')
    let font_app_config = require('./front-app/webpack-config/webpack.dev.conf')
    let compiler = require('webpack')(font_app_config)

    app.use(webpackMiddleware(compiler,{serverSideRender:true}))

    app.get('/chat', (req, res) => {

        var user = res.locals.user
        res.send(`
            <html>
                <head>
                    <title>My App</title>
                    <meta name="viewport" content="width=360,user-scalable=no">
                    <script src="/socket.io/socket.io.js"></script>
                </head>
                <body>
                    <!-- <h3>${user.account}<a href="/auth/logout">退出</a></h3>-->
                    <div id="app" class="app"></div>
                </body>
                <script>
                    var user = {
                        name : "${user.account}",
                        id:${user.id},
                        logo:"${user.logo}"
                    }
                </script>
                <script src="chat.js"></script>
            </html>
	`)
    })

    app.get('/admin', (req, res) => {
        res.send(`
               <html>
                 <head>
                   <title>My App</title>
                    <link rel="stylesheet" href="admin.css">
                 </head>
                 <body>
                   <div id="app"></div>
                   <script src="admin.js"></script>

                 </body>
               </html>
        `)
    })
} else {
    app.get('/chat', (req, res) => {
        res.render('chat')
    })
    app.get('/admin', (req, res) => {
        res.render('admin')
    })
}

let clients = {}
io.on('connection',(socket)=>{
    console.log('user connected')
    socket.on('login',(name)=>{
        clients[name] = socket
    })
    socket.on('send-message',(msg)=>{
        model.redis.lpush(msg.from+'_'+msg.to,JSON.stringify(Object.assign({},msg,{type:'send',timeStamp:moment.now(),read:true})))
        model.redis.lpush(msg.to+'_'+msg.from,JSON.stringify(Object.assign({},msg,{type:'receive',timeStamp:moment.now(),read:false})))
        // console.log(clients)
        // consolo.log(msg)
        if(clients[msg.to]){
            clients[msg.to].emit('receive-message',msg)
        }
    })
})

http.listen(3001,function () {
    console.log('node server run on port 3001')
})
