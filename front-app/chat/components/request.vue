<template>
  <div class="pageContainer">
    <div class="title_wrap">
      <a href="#" class="title_name">好友请求</a>
    </div>
    <div class="search-area">
      <el-input placeholder="输入搜索用户" icon="search" v-model="searchContent" :on-icon-click="search"></el-input>
    </div>
    <div class="user-list">
      <div v-for="u in searchUser" class="user-item">
        <el-row>
          <el-col :span="21">
            <img v-if="u.logo==null" src="//localhost:3001/static/upload/noPhoto.png" alt="#">
            <img v-else :src="u.logo" alt="#">
            <span>{{u.account}}</span>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="sendRequest(u)">发送请求</el-button>
          </el-col>
        </el-row>
      </div>
      <!--<span v-if="searchUser.length==0"></span>-->
    </div>
    <div class="request-list">
        <h3>好友请求</h3>
        <div v-for="r in requests">
          <el-row>
            <el-col :span="21">
              <img :src="r.fromLogo" alt="" class="logo">
              <span>{{r.fromName}}</span>
            </el-col>
            <el-col :span="3">
              <el-button v-if="!r.accept" type="success" @click="sendRequest(u)">接受</el-button>
              <el-button v-else type="primary" :disabled="true">已添加</el-button>
            </el-col>
          </el-row>
        </div>
    </div>


  </div>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import socket from '../socket'
  export default {
    name: 'request',
    data () {
      return {
        searchContent: ''
      }
    },
    computed:{
        ...mapGetters(['searchUser','me','requests'])
    }
    ,
    methods:{
        ...mapMutations(['add_request']),
        ...mapActions(['fetch_search_user','fetch_request']),
        search(){
            //todo bug
            this.fetch_search_user({"from":this.me.id,"query":this.searchContent}).then(()=>{
                if(this.searchUser.length==0){
                    this.$message({
                        message: '找不到你要的用户诶',
                        type: 'warning'
                    });
                }
            })
        },
        sendRequest(u){
            this.$prompt('对他说点什么吧', '发送请求', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                socket.emit('send-request',{
                    fromId:this.me.id,fromUser:this.me.account,toId:u.id,toUser:u.account,content:value})
            })
        }
    },
    mounted(){
        this.fetch_request()
        socket.on('receive-request',(obj)=>{
            this.add_request(obj)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pageContainer{
    width: 100%;
    height: 100%;
    background-color: #eee;
    overflow: auto;
  }
  .pageContainer .title_wrap{
    position: relative;
    padding: 10px 0;
    margin: 0 19px;
    border-bottom: 1px solid #d6d6d6;
    background-color: #eee;
    z-index: 1024;
    line-height: 30px;
    text-align: center;
    margin-bottom: 10px;
  }
  .pageContainer .title_wrap .title_name{
    display: inline-block;
    vertical-align: middle;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    text-decoration: none;
    color: #000;
    font-weight: 400;
  }
  .search-area{
    width: 70%;
    margin: 0 auto;
  }
  .user-list{
    padding-top: 20px;
    width: 80%;
    margin: 0 auto;
  }
  .user-list .user-item img{
    width: 50px;
    height: 50px;
    vertical-align: middle;
  }
  .user-list .user-item span{
    font-size: 20px;
  }
  .request-list{
    width: 90%;
    margin: 0 auto;
  }
  .request-list .logo{
    width: 50px;
    height: 50px;
    border-radius: 3px;
    vertical-align: middle;
  }
</style>
