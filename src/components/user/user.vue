<template>
  <div class="user">
    <div class="us-head">
      <div class="photo"><img src="static/fix.jpg" height="80" width="87"></div>
      <div class="name">豆瓣用户路人甲</div>
    </div>
    <div class="use-tab">
      <div class="tab-item" :class="{'active':currindex===0}">想看</div>
      <div class="tab-item" :class="{'active':currindex===1}">看过</div>
      <div class="tab-item" :class="{'active':currindex===2}">影人</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currindex:0
    }
  }
}

</script>
<style scoped lang="stylus">
  .user
    position fixed
    top 0
    left 0
    right 0
    bottom 60px
    .us-head
      padding 35px 20px
      height 80px
      background  linear-gradient(#42bd56,#9ad57f)
      .photo
        border-radius 50%
        width 80px
        height 80px
        overflow hidden
        float left
      .name
        line-height 80px
        margin-left 20px
        float left
        color white
    .use-tab
      width 100%
      height 47px
      display flex
      .tab-item
        flex 1
        height 100%
        line-height 47px
        text-align center
        color #777
        &.active
          color green 
          border-bottom 1px solid green
</style>