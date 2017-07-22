<template>
  <el-table
    :data="list"
    style="width: 100%"
    height="500">

    <el-table-column
      prop="id"
      label="id">
      <template scope="scope">
        <router-link :to=" 'post/'+scope.row.id ">{{scope.row.id}}</router-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题">
      <template scope="scope">
        <router-link :to=" 'post/'+scope.row.id ">{{scope.row.title}}</router-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容">
    </el-table-column>
    <el-table-column
      prop="createdAt"
      label="创建时间">
    </el-table-column>
    <el-table-column
      prop="loginUserId"
      label="作者ID">
    </el-table-column>

  </el-table>

</template>

<script>
  import {getPost} from '../api'
  export default {
      name: 'post',
      data () {
        return {
           list:[]
        }
      },
      methods : {

      },
      mounted (){
        getPost(list=>this.list=list)
      }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
