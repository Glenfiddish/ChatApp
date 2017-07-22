<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">{{this.fromUserName}} 与 {{this.toUserName}} 的聊天记录</span>
    </div>
    <span v-if="chatMessage.length==0">暂无数据</span>
    <div v-if="chatMessage.length>0" v-for="o in chatMessage" :key="o" class="text item">
      {{ o }}
    </div>
  </el-card>
</template>

<script>
  import {getMessage} from '../api'
  export default {
      name: 'message',
      data () {
        return {
          fromUserId:-1,
          fromUserName:'',
          toUserId:-1,
          toUserName:'',
          chatMessage:[{content:'你好啊',time:'sysdate'},{content:'你好',time:'sysdate'}]
        }
      },
      methods : {

      },
      mounted (){
        this.fromUser = this.$route.params.id
        this.toUser = this.$route.params.toId
        getMessage(this.fromUser,this.toUser,(message)=>{
            this.chatMessage = message.list
            this.fromUserName = message.formUserName
            this.toUserName = message.toUserName
        })
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
