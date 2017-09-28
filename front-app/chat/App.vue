<template>
  <div id="app">
    <el-row >
      <el-col :span="7" class="aside">
        <!--user infomation-->
        <div class="userInfo">
          <img :src="me.logo" alt="#">
          <span class="username">{{me.name}}</span>
        </div>

        <!--chat item-->
        <div class="tag">
          <a class="tag-item"><i class="el-icon-message" slot="icon" @click="clickMsg"></i></a>
          <a class="tag-item"><i class="el-icon-warning" slot="icon" @click="routeTo('/request')"></i></a>
          <a class="tag-item"><i class="el-icon-picture" slot="icon" @click="routeTo('/post')"></i></a>
        </div>

        <!--friend list-->
        <div v-for="f in friends" class="friend-item" @click="startChat(f)">
          <el-badge :value="f.unread" class="item">
              <avatar username="f.account" :src="f.logo" :size="50"></avatar>
          </el-badge>
          <span class="friend-item-name">{{ f.account }}</span>
        </div>

      </el-col>
      <el-col :span="17">
        <!--route-->
        <router-view class="pages"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {mapGetters,mapActions,mapMutations} from 'vuex'
    import Avatar from 'vue-avatar'
    export default {
        name: 'app',
        computed: {
            ...mapGetters([
                'friends',
                'posts',
                'self',
                'me',
                'you'
            ])
        },
        methods: {
            ...mapActions([
                'fetch_friends'
            ]),
            ...mapMutations(['set_you','clear_unread']),
            startChat(f){
                this.set_you(f)
                this.$router.push('./dialog')
                this.clear_unread({from:this.you.id})
            },
            clickMsg(){
                console.log('1')
            },
            routeTo(r){
                this.$router.push(r)
            }
        },
        mounted(){
            this.fetch_friends()
        },
        components:{
            avatar:Avatar.Avatar
        }
    }
</script>

<style>
  html,body,h1,h2,h3,h4,h5,span,ul,li,a,p{
    margin: 0;
    padding: 0;
  }
  body{
    font-family: Helvetica Neue,Helvetica,Hiragino Sans GB,Microsoft YaHei;
  }

  #app {
    margin:0 auto;
    /*max-width: 90%px;*/
    width: 75%;
    height: 100%;
    -webkit-border-radius: 3px;
    overflow: hidden;
    /*border:1px solid black;*/
  }

  /*userinfo css*/
  .aside{
    height: 100%;
    background-color: #2e3238;
  }
  .userInfo{
    padding: 18px;
  }
  .userInfo img{
    -webkit-border-radius: 4px;
    width: 60px;
    height: 60px;
    margin-right: 20px;
  }
  .userInfo .username{
    display: inline-block;
    font-weight: 400;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #fff;
    font-size: 22px;
    vertical-align: top;
    line-height: 50px;
    text-decoration: none;
  }

  /*pages css*/
  .pages{
    height:100%;
  }

  /*tag css */
  .tag{
    overflow: hidden;
    position: relative;
    padding-bottom: 8px;
    border-bottom: 1px solid #24272c
  }
  .tag .tag-item{
    float: left;
    width: 32.33333333%;
    position: relative;
    padding: 5px 0;
    border-right: 2px solid #24272c;
    -webkit-border-radius: 3px;
  }
  .tag .tag-item:hover{
    background-color: #3caf36;
  }
  .tag .tag-item i{
    width: 100%;
    text-align: center;
    font-size: 28px;
    color: white;
  }

  /*friend list css*/
  .friend-item{
    overflow: hidden;
    padding: 12px 18px 11px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    position: relative;
  }

  .friend-item-name{
    font-size: 18px;
    margin-left: 20px;
  }
  .friend-item:hover{
    background-color: #e2e2e2;
  }

  @media screen and ( max-width: 650px ) {
    #app {
      width: 100%;
      height: 100%;
    }
    .friend-item-name{
      display: none;
    }
    .friend-item{
      padding: 6px 6px 5px;
      margin: 0 auto;
    }
    .tag .tag-item{
      width: 100%;
    }
    .tag .tag-item i{
      font-size: 30px;
    }
    .userInfo img{
      -webkit-border-radius: 2px;
      width: 100%;
      /*height: 45px;*/
      margin-right: 10px;
    }
    .userInfo .username{
      width: 100%;
      font-size: 20px;
      text-align: center;
      line-height: 20px;
    }
  }
</style>
