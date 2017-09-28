<template>
  <div class="post">
    <div class="title_wrap"><a href="#" class="title_name">说说</a></div>
    <ul class="post-list">
      <li v-for="(p,index) in posts" class="post-item">
        <el-row >
          <el-col :span="4" >
            <img :src="p.logo" alt="#" class="logo">
          </el-col>
          <el-col :span="20" >
              <span class="post-name">{{p.account}}</span>
              <p>{{p.content}}</p>
              <span>
                <i class="el-icon-edit comment"></i>
              </span>
              <div class="bottom clearfix">
                <span class="comment-item" v-for="c in p.comment"> {{c.account }}  :  {{c.comment}}</span>
                <time class="time">{{ moment(p.createdAt).format('YYYY-MM-DD hh:mm:ss') }}</time>
                <span class="star">点赞: {{p.stars.length}}  </span>
              </div>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapActions,mapMutations} from 'vuex'
  export default {
    name: 'post',
    computed: {
        ...mapGetters([
          'friends',
          'posts',
          'self'
      ])
    },
    methods: {
      ...mapActions([
        'fetch_posts'
      ]),
    },
    mounted() {
      this.fetch_posts()
      console.log(this)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .post{
    width: 100%;
    height: 100%;
    background-color: #eee;
    overflow: auto;
  }
  .wd100{
    width: 100%;
  }
  .post .title_wrap{
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
  .post .title_wrap .title_name{
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
  ul,li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .post-list{
    width: 100%;
  }
  .post-list .post-item{
    width: 90%;
    margin: 0 auto;
    border-bottom: 1px solid #d6d6d6;
    padding-bottom: 12px;
    margin-top: 12px;
  }
  .post-list .post-item .logo{
    width: 50px;
    height: 50px;
  }
  .post-list .post-item .comment{
    cursor: pointer;
    float: right;
  }
  .post-list .post-item .post-name{
    font-size: 20px;
    font-weight: 600;
    color: #1c8de0;
    line-height: 30px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .comment-item{
    display: inline-block;
    width: 100%;
    font-size: 16px;
    padding: 5px 0px;
    margin-bottom: 10px;
    background-color: #e9e9e9;
  }
  .star {
    padding: 0;
    float: right;
    font-size: 16px;
    margin-right: 15px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
