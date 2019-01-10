<template>
  <div class="review">
    <div class=review-item v-for="(review,index) in movie_review" :key="index" @click="selectReview(review.id)">
      <h1 class="title">{{review.title}}</h1>
      <div class="user-info">
        <div class="avatar">
          <img :src="review.author.avatar" width="25" height="25">
        </div>
        <span class="name">{{review.author.name}}</span>
        <star :size="24" :score="review.rating.value*2" :needNullStar="false"></star>
      </div>
      <p class="desc">{{review.summary}}</p>
    </div>
    <div class="allReview" v-if="num">
      <span @click="goallreview">全部影评{{num}}个</span>
    </div>
  </div>
</template>

<script>
import star from "components/star/star"
export default {
  props:{
    movie_review:{
      type:Array
    },
    num:{
      type:Number    
    }
  },
  components:{
    star
  },
  methods:{
    goallreview(){
      this.$emit("goallreview")
    },
    selectReview(id){
      this.$emit("selectReview",id)
    }
  }
}

</script>
<style scoped lang="stylus">
  .review
    padding 20px 0
    .review-item
      margin-bottom 20px
      font-size 12px
      color #777
    .title
      font-size 14px
      line-height 20px
      color #333
    .user-info
      padding: 5px 0
      .avatar
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        img
          border-radius: 50%
      .name
        display: inline-block
        vertical-align: middle
      .star
        display: inline-block
        vertical-align: middle
    .desc
      line-height: 20px
    .allReview
      padding-bottom 10px
      color #42bd56
      text-align center
      font-size 14px
</style>