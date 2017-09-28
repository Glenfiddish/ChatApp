/**
 * Created by Edwin on 2017/6/13.
 */
const config = require('./config');

const Sequelize = require('sequelize');
const vueAdmin = new Sequelize('vueAdmin', config.username, config.password, config.host);

var r = require("redis"),
    redis = r.createClient();

const User = vueAdmin.define('login_users', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    account: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    sex: Sequelize.STRING,
    age: Sequelize.INTEGER,
    address: Sequelize.STRING,
    logo:Sequelize.STRING
});

const Post = vueAdmin.define('post', {
    title:Sequelize.STRING,
    content:Sequelize.STRING,
    image:Sequelize.STRING
});

Post.belongsTo(User)

const Comment = vueAdmin.define('comment',{
    comment:Sequelize.STRING
})
Comment.belongsTo(User)
Comment.belongsTo(Post)

const Star = vueAdmin.define('star',{
    star:Sequelize.STRING
})
Star.belongsTo(User)
Star.belongsTo(Post)

const Reply = vueAdmin.define('reply',{
    reply:Sequelize.STRING
})
Reply.belongsTo(Comment)

const Request = vueAdmin.define('request',{
    concent:Sequelize.STRING,
    response:Sequelize.STRING,
    isRead:Sequelize.BOOLEAN,
    accept:Sequelize.BOOLEAN
})
Request.belongsTo(User,{as:'from'})
Request.belongsTo(User,{as:'to'})

const Relation = vueAdmin.define('relation',{

})

User.belongsToMany(User,{as:'friend',through:Relation})

// vueAdmin.sync()

module.exports = {
    User,
    Post,
    Comment,
    Star,
    Reply,
    Relation,
    Request,
    connect:vueAdmin,
    redis
}
