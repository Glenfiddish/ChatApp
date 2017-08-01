<template>
  <div>
    <h3 style="text-align: center">说说文章</h3>
    <ul class="post-list">
      <li v-for="(p,index) in posts" class="post-item">
        <el-card :body-style="{ padding: '0px' }">
          <div style="width: 100%;background-color: rgba(200,200,200,.1)">
            <img :src="p.logo" alt="#" class="logo">
            <span style="font-size: 25px">{{p.account}}</span>
          </div>
          <img :src="p.image" class="image" >
          <div style="padding: 14px;">
            <span class="item-title">{{index + p.title}}</span>
            <p>{{p.content}}</p>
            <div class="bottom clearfix">
              <span class="comment-item" v-for="c in p.comment"> {{c.account }}  :  {{c.comment}}</span>
              <time class="time">{{ moment(p.createdAt).format('YYYY-MM-DD hh:mm:ss') }}</time>
              <span class="star">点赞: {{p.stars.length}}  </span>
            </div>
          </div>
        </el-card>
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
  ul,li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .logo{
    width: 50px;
    height: 50px;
    vertical-align: top;
    margin-right: 20px;
  }
  .post-list{
    margin: 0 auto;
    width: 1200px;
  }
  .post-item{
    display:inline-block;
    width: 500px;
    padding-right: 10px;
    padding-bottom: 10px;
  }
  .item-title{
    font-size: 20px;
    font-weight: bold;
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

  .image {
    width: 100%;
    display: block;
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
