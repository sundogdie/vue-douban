<template>
  <div class="comment">
    <div v-for="(comment,index) in movie_comment" :key="index" class="comment-item">
      <div class="avatar">
        <img :src="comment.author.avatar" width="36" height="36">
      </div>
      <div class="content">
        <h1 class="name">{{comment.author.name}}</h1>
        <star :size="24" :score="comment.rating.value * 2" :needNullStar="false"></star>
        <p class="text">{{comment.content}}</p>
        <span class="date">{{comment.created_at}}</span>
        <div class="useful-count">
          <i class="icon-thumb_up" ></i>
          {{comment.useful_count}}
        </div>
      </div>          
    </div>
    <div class="allComment" v-if="Cnum">
      <span @click="goallcomment">全部短评{{Cnum}}个</span>
    </div>
  </div>
</template>

<script>
import star from "components/star/star"
export default {
  components:{
    star
  },
  methods:{
    goallcomment(){
      this.$emit('goallcomment')
    }
  },
  props:{
    movie_comment:{
      type:Array
    },
    Cnum:{
      type:Number
    }
  }
}

</script>
<style scoped lang="stylus">
  .comment
    padding 20px 0
    .comment-item
      padding-bottom 20px
      display flex
      position relative
      color #777
      font-size 14px
      .avatar
        flex 0 0 36px
        width 36px
        margin-right 12px
        img
          border-radius 50%
      .content
        flex 1
      .name
        display: inline-block
        line-height: 25px
        margin-right: 5px
      .star
        display: inline-block
      .text
        line-height: 20px
      .date
        line-height: 25px
        font-size 12px
      .useful-count
        position: absolute
        top: 5px
        right: 5px
    .allComment
      padding-bottom 10px
      color #42bd56
      text-align center
      font-size 14px
</style>