<template>
  <div>
    <h2>标题:{{ title }}</h2>
    <h3>内容:{{ content }}</h3>

    <h3>评论内容</h3>
    <el-table :data="comments" height="250" border>
      <el-table-column
        prop="id"
        label="评论ID">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="account"
        label="评论人">
      </el-table-column>
    </el-table>

    <h3>点赞用户</h3>
    <el-table :data="stars" height="250" border>
      <el-table-column
        prop="loginUserId"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="account"
        label="用户">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {getPostDetail} from '../api'
  export default {
    name: 'postItem',
    data () {
      return {
          postId:-1,
          title:'',
          content:'',
          comments :[],
          stars:[]
      }
    },
    mounted(){
      this.postId = this.$route.params.postId
      getPostDetail(this.postId,(post)=>{
        this.title = post.title
        this.content = post.content
        this.comments = post.comments
        this.stars = post.stars
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
