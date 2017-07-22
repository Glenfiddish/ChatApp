<template>
  <div>
    <h2>
      {{list.account }}
    </h2>
    <div>
      <img :src="list.logo" width="100" height="100"/>
      <el-upload
        name="file"
        action="http://localhost:3001/upload"
        :on-success="uploadSuccess"
        :file-list="uploadList"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>

      </el-upload>
      <el-button v-if="saveUpload" size="small" type="success" @click="saveLogo">提交保存</el-button>
    </div>
    <!-- post table list -->
    <h3>说说文章</h3>

    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="postList.visible=true,postList.type='add'">增加文章</el-button>
      </el-form-item>
    </el-form>

    <!-- 说说编辑面板-->
    <el-dialog :title= getTitle(this.postList.type)  :visible.sync="postList.visible" @close="postList.title='',postList.content=''">
      <el-form id="postForm">
        <el-form-item label="标题" label-width="120px">
          <el-input auto-complete="off" v-model="postList.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="120px">
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="postList.content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="postList.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitPost(postList,loginUserId)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 说说编辑面板-->

    <el-table
      :data="list.post"
      height="250" border>
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="image"
        label="图片">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="loginUserId"
        label="用户ID">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="openEditPost(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDeletePost(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- friend table list -->
    <h3>朋友</h3>
    <el-form :inline="true">
      <el-form-item v-if="!addFriend.visible">
        <el-button @click="addFriend.visible=true">增加好友</el-button>
      </el-form-item>
      <el-form-item v-if="addFriend.visible">
        <el-select v-model="addFriend.friendId">
          <el-option
            v-for="u in allUser"
            :label="u.account"
            :value="u.id"
            :key="u.id"
            v-if="!isFriend(u.id)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  v-if="addFriend.visible">
        <el-button @click="handleAddFriend(loginUserId,addFriend.Id)">确定</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list.friend"
      height="250" border>

      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="account"
        label="账户">
      </el-table-column>
      <el-table-column
        prop="name"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="">
            <router-link :to="'/user/'+loginUserId+'/message/'+ scope.row.id">查看聊天记录</router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- friend table list -->

  </div>
</template>
<script>
  import {getUserDetail,deletePost,editPost,addPost,getAllUser,addFrid,editUser} from '../api'
  export default {
    name: 'userItem',
    data () {
      return {
        list: {},
        postList:{
            visible: false, //显示dialog
            title:'',
            content:'',
            postId:'', //删除时候获取
            type:'' //提交的类型 add？
        },
        addFriend:{
            visible: false,
            friendId:''
        },
        allUser:[],
        uploadList:[],
        saveUpload : false,
        uploadTemp :　''
      }
    },
    methods: {
      /**
       * 刷新页面信息
       */
      pageData(){
        getUserDetail(this.loginUserId, (res) => this.list = res)
      },
      /**
       * 提交post
       */
      submitPost(data,loginUserId){
          console.log(loginUserId)
        if(data.type=='add'){
          addPost(data,loginUserId,(item)=>{
            this.list.post.push(item)
            this.postList.visible= false
          })
        }else{
          editPost(data,(item)=>{
            this.list.post = this.list.post.map((obj)=>{
                if(obj.id==item.id){
                    obj = Object.assign({},item)
                }
                return obj
            })
            this.postList.visible = false
            this.$message({
              type: 'success',
              message: '成功修改!'
            })
          })
        }
      },

      /**
       * 打开编辑
       * @param idx
       * @param rows
       */
      openEditPost(idx,rows){
        this.postList.visible=true
        this.postList.content=rows.content
        this.postList.title=rows.title
        this.postList.postId = rows.id
        this.postList.type='edit'
      },

      /**
       * 删除操作
       * @param postId
       */
      handleDeletePost(postId){
        this.$confirm('此操作将永久删除该这条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
            deletePost(postId,(item)=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.list.post = this.list.post.filter((obj)=>{
                  return obj.id != item.id
              })
            })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getTitle(type){
        return type == 'add' ? '增加说说' : '编辑说说'
      },
      isFriend(id){
          return !!this.list.friend.find((user)=>{
              return user.id == id
          })
      },
      handleAddFriend(loginUserId,friendId){
          console.log(this.addFriend.friendId)
          console.log(this.loginUserId)
        console.log(friendId)
        addFrid(this.loginUserId,this.addFriend,(item)=>{
           console.log(item)
            this.list.friend.push(item)
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          this.addFriend.visible = false
        })
      },
      /**
       * 上传图片到服务器
       * @param res
       */
      uploadSuccess(res){
          console.log(res.url)
          this.uploadTemp = res.url
          this.saveUpload = true
      },
      saveLogo(){
          editUser(this.list.id,{logo:this.uploadTemp},(res,err)=>{
            if(!err){
              this.$message({
                type: 'success',
                message: '上传成功!'
              })
              this.list.logo = this.uploadTemp

            }else{
              this.$message({
                type: 'warning',
                message: '上传失败!'
              })
            }
          })
          this.saveUpload = false
          this.uploadList = []
      }
    },
    mounted () {
      this.loginUserId = this.$route.params.id
      getUserDetail(this.loginUserId, (res) => {
          this.list = res
          if(!this.list.logo){
              this.list.logo = 'http://localhost:3001/static/upload/noPhoto.jpg'
          }
          this.allUser = res.otherUser
          console.log(this)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
