<template>
  <div id="app">
    <el-row>
      <el-col :span="24" class="header">
        <el-col :span="10" class="header-title">vue-admin</el-col>
        <el-col :span="10" class="header2"><i class="el-icon-menu indent-20"></i></el-col>
        <el-col :span="4" class="user-info">
          <el-dropdown class="user-right">
            <span class="el-dropdown-link user-name">
              <img class="user-photo" src="./assets/timg.jpg" alt="">
              张XX
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-col>
      <el-col :span="24" >
        <aside class="menu">
          <el-menu default-active="1" class="el-menu-vertical-demo menu-bar" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-setting"></i>基础资料</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="routeTo('/user')">用户</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="1-2" @click="routeTo('/post')"><i class="el-icon-message"></i>说说</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
          </el-menu>
        </aside>
        <section class="content">
          <el-col :span="24">
            <el-breadcrumb class="content-title" separator="/">
              <el-breadcrumb-item >首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{moment(dateTest).format('YYYY-MM-DD hh:mm:ss')}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24">
            <router-view></router-view>
          </el-col>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return{
        dateTest: '2017-06-20T21:55:25.000Z'
    }
  },
  methods: {
    handleOpen () {
      console.log('u click handleOpen')
    },
    handleClose () {
      console.log('u click handleClose')
    },
    routeTo (route){
        this.$router.push(route)
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  .header {
    background-color: cornflowerblue;
    height: 60px;
    line-height: 60px;
  }

  .header-title {
    width: 230px;
    text-indent: 40px;
    font-size: 30px;
    color: white;
  }

  .header2 {
    border-left: 0.01px solid aliceblue;
    width: 180px;
  }

  .indent-20 {
    text-indent: 30px;
  }

  .user-info {
    float: right;
    padding: 0 10px;
    height: 60px;
  }

  .user-right {
    text-align: right;
    float: right;
    cursor: pointer;
  }

  .user-photo {
    width: 50px;
    height: 50px;
    display: inline-block;
    border-radius: 50%;
    padding: 5px 10px;
    float: right;
  }

  .user-name {
    display: inline-block;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
    vertical-align: center;
  }

  .menu{
    -ms-flex: 0 0 230px;
    flex: 0 0 230px;
    width: 230px;
  }

  .content{
    -ms-flex: 1;
    flex: 1;
    overflow-y: scroll;
    padding: 20px;
  }

  .menu-bar {
    background-color: #eef1f6;
    width: 230px;
    height: 674px;
    display: inline-block;
    float: left;
  }
  .content-title{
    float: right;
    font-size: 16px;
  }


</style>
