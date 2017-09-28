# 聊天APP
> this is chatApp show By vue2.0
##npm run dev 访问localhost:3000
## 安装步骤

# npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

### 实现内容 在线聊天 添加好友 好友请求 发送好友文章(点赞 评论) 后台数据查看(增删查改)
### 使用技术简介 （vue2.x + webpack3.3 + superagent + vue-router + vuex + Element-UI）
### 项目简单演示
####后台管理系统
![img](https://github.com/Glenfiddish/ChatApp/blob/rebuild0804/img/homepage.jpg)
####聊天app
![img](https://github.com/Glenfiddish/ChatApp/blob/rebuild0804/img/request.jpg)
![img](https://github.com/Glenfiddish/ChatApp/blob/rebuild0804/img/chat.jpg)


# 教程


## 安装 vue-cli 脚手架


运行如下命令， vue 项目，并且通过本地 8080 端口启动服务

``` bash
npm install -g vue-cli
vue init webpack projectName
cd projectName
npm install
npm run dev
```


安装完成后，即可看到以下文件结构：

```
.
|-- admin                             // admin项目(未重构前)
|-- chat                              // chat项目(未重构前)
|-- app                               // node server api
|   |-- auth                          // 登陆api
|   |-- message                       // 聊天接口
|   |-- post                          // post接口
|   |-- user                          // 用户数据请求接口
|-- config                            // 数据库地址、数据表配置
|   |-- config.js                     // 数据库基础配置
|   |-- model.js                      // 数据表配置
|-- font-app                          // 前端项目(重构后合并chat和admin)
|   |-- admin                         // admin项目(重构后)
|   |-- chat                          // chat项目(重构后)
|   |-- config                        // npm script配置
|   |-- webpack-config                // webpack配置
|-- views                             // EJS模板
|   |-- login.ejs                     // 登陆
|   |-- logout.ejs                    // 登出
|   |-- chat.ejs                      // 聊天app
|   |-- index.ejs                     // 主页
|   |-- admin.ejs                     // admin项目
|-- .babelrc                          // ES6语法编译配置
|-- .editorconfig                     // 定义代码格式
|-- .eslintignore                     // ESLint 检查忽略的文件
|-- .eslistrc.js                      // ESLint 文件，如需更改规则则在此文件添加
|-- .gitignore                        // git 上传需要忽略的文件
|-- README.md                         // 项目说明
|-- index.html                        // 入口页面
|-- package.json                      // 项目基本信息
.
```
