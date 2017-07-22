<template>
  <div>
    <el-table
      :data="list"
      height="250" border>
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
        <template scope="scope">
          <router-link :to=" 'user/'+scope.row.id ">{{scope.row.name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="120">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="120">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="200">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template scope="scope">
          <el-button @click="handleClick" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {getAllUser,a} from '../api'
  export default {
    name: 'user',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        list:[]
      }
    },
    methods: {
      handleClick(){
          console.log('handleClick')
      }
    },
    mounted () {
      getAllUser(list=>this.list=list)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
