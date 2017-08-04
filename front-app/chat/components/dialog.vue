<template>
  <div class="dialag">
    <div class="container">
      <!--title-->
      <div class="title_wrap"><a href="#" class="title_name">{{you.account}} </a></div>
      <!--chatlog-->
      <div class="dialogContent" id="dialogContent">
        <div class="dialog" >
          <div v-for="item in message" >
            <p v-if="item.type=='send'" :class="item.type">
              <!--<span>{{item.from}}</span>-->
              <span>{{item.text}}</span>
              <img :src="me.logo" width="40" height="40"/>
            </p>
            <p v-else :class="item.type">
              <img :src="you.logo" width="40" height="40"/>
              <span>{{item.text}}</span>
            </p>
          </div>
        </div>
      </div>
      <!--talk modal-->
      <div class="input-modal">
        <!--tool bar-->
        <div class="tool-bar">
          <div class="tool-item">
            <i class="el-icon-edit"></i>
          </div>
          <div class="tool-item">
            <i class="el-icon-share"></i>
          </div>
          <div class="tool-item">
            <i class="el-icon-delete"></i>
          </div>
        </div>
        <el-input type="textarea" :autofocus="false" :autosize="{ minRows: 7, maxRows:10}" resize="none" v-model="text" class="input-area" id="input-area"></el-input>
        <span slot="footer"><el-button type="primary" class="sendBtn" @click="sendMsg">发送</el-button></span>
      </div>
    </div>
  </div>
</template>

<script>
  import socket from '../socket'
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    name: 'dialog',
    data () {
      return {
          text: ''
      }
    },
    computed:{
        ...mapGetters([
            'message',
            'me',
            'you'
        ])
    },
    methods:{
        scrollToBottom(){
            var dialogContent = document.getElementById('dialogContent')
            dialogContent.scrollTop = dialogContent.scrollHeight
        },
        sendMsg(){
            if(this.text==''){
                this.$message({
                    message: '发送消息不能为空',
                    type: 'warning'
                });
                return false
            }
            var that = this
            this.send_message({to:that.you.id,text:that.text,from:that.me.id,type:'send'})
            socket.emit('send-message',{to:that.you.id,text:that.text,from:that.me.id,type:'send'})
            this.scrollToBottom()
            this.text=''
        },
        ...mapMutations(['send_message','add_unread']),
        ...mapActions(['fetch_message'])
    },
    watch:{
      you:{
          handler:function(){
              this.fetch_message()
          },
          deep:true
      }
    },
    mounted(){
        var that = this
        socket.on('receive-message',(obj)=>{
            that.send_message({to:that.me.id,text:obj.text,from:this.you.id,type:'receive'})
            that.add_unread(obj)
        })
        this.fetch_message({fromId:that.me.id,toId:that.you.id})
        this.scrollToBottom()
        var input = document.getElementById("input-area")
        input.addEventListener('keyup',(e)=>{
            if(e.keyCode==13){
                this.sendMsg()
            }
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dialag{
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
  /*title css*/
  .container .title_wrap{
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
  .container .title_wrap .title_name{
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

  /*chatlog css*/
  .send{
    text-align: right;
  }
  .receive{
    text-align: left;
  }
  .container .dialogContent{
    height: 410px;
    overflow: auto;
  }
  .container .dialogContent .dialog{
    width: 80%;
    margin: 0 auto;
  }
  p * {
    vertical-align: middle;
    font-size: 14px;
    margin-bottom: 16px;
  }

  /*input-modal*/
  .input-modal{
    height: 100%;
  }
  /*tool-bar css*/
  .tool-bar{
    border-top: 1px solid #d6d6d6;
    padding: 10px 20px;
  }
  .tool-bar .tool-item{
    float: left;
    width: 60px;
    text-align: center;
  }
  .tool-bar .tool-item i{
    font-size: 25px;
  }
  /*input-area css*/
  .input-modal .input-area{
    margin-top: 12px;
    border: none;
    background-color:  #eee;
  }
  .input-modal .sendBtn{
    float:right;
  }

</style>
