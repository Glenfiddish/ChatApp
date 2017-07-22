<template>
  <div>{{ msg }}
    <h2>正在和 {{chatWith}} 聊天中</h2>
  </div>
</template>

<script>
export default {
  name: 'dialog',
  data () {
    return {
      msg: 'dialog',
      chatWith: ''
    }
  },
  mounted(){
      this.chatWith = this.$route.query.name
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
