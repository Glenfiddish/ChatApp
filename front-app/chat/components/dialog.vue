<template>
  <div class="dialag">
    <h3>正在与{{you.username}}聊天</h3>
    <div>
      <div v-for="item in message" >
        <p v-if="item.type=='send'" :class="item.type">
          <!--<span>{{item.from}}</span>-->
          <span>{{item.text}}</span>
          <img :src="me.logo" width="30" height="30"/>
        </p>
        <p v-else :class="item.type">
          <img :src="you.logo" width="30" height="30"/>
          <!--<span>{{item.from}}</span>-->
          <span>{{item.text}}</span>
        </p>
      </div>
    </div>
    <el-input type="textarea" v-model="text"></el-input>
    <el-button type="primary" @click="sendMsg">发送</el-button>
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
        sendMsg(){
            var that = this
            this.send_message({to:that.you.id,text:that.text,from:that.me.id,type:'send'})
            socket.emit('send-message',{to:that.you.id,text:that.text,from:that.me.id,type:'send'})
            this.text=''
        },
        ...mapMutations(['send_message','set_you']),
        ...mapActions(['fetch_message'])
    },
    mounted(){
        var that = this
        this.set_you({id:this.$route.query.to,username:this.$route.query.name})
        socket.on('receive-message',(obj)=>{
//            console.log(receive-message)
            that.send_message({to:that.me.id,text:obj.text,from:this.you.id,type:'receive'})
        })
        this.fetch_message({fromId:that.me.id,toId:that.you.id})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .send{
    text-align: right;
  }
  .receive{
    text-align: left;
  }
  p * {
    vertical-align: middle;
    font-size: 14px;
  }
</style>
