<template>
  <div>
    <h2>好友列表</h2>
    <!--<ul class="friend-list">-->
      <!--<li>-->
        <!---->
      <!--</li>-->
    <!--</ul>-->
    <div v-for="f in friends" class="friend-item">
      <img :src="f.logo" alt="#" width="100px" height="100px" @click="startChat(f)" class="friend-item-logo">
      <span class="friend-item-name">{{ f.account }}</span>
    </div>
    <!--{{ friends }}-->
  </div>
</template>

<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name: 'friend',
    computed:{
      ...mapGetters([
          'friends',
          'posts',
          'self'
      ])
    },
    methods:{
      ...mapActions([
          'fetch_friends'
      ]),
      startChat(f){
          this.$router.push('./dialog?to='+f.id+'&&name='+f.account)
      }
    },
    mounted(){
        this.fetch_friends()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .friend-item:hover{
    background-color: #e2e2e2;
  }
  .friend-item{
    margin-bottom: 5px;
    /*border: 1px solid #e2e2e2;*/
  }
  .friend-item-logo{
    vertical-align:middle;
  }
  .friend-item-name{
    font-size: 30px;
    margin-left: 20px;
  }
</style>
