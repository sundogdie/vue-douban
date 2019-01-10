<template>
  <div class="rank-list-wrapper">
    <ul>
      <li class="rank-item" v-for="(item,index) in ranklist" :key="index">
        <div class="rank-rating">
          <span class="item-border"></span>
          <span class="item-num">{{index+1}}</span>
        </div>
        <div class="rank-info" @click="tomovie(item)">
          <div class="info-image"><img v-lazy="item.image" width="70" height="100"></div>
          <div class="info-content">
            <span class="info-title">{{item.title}}</span>
            <star :score="item.rating" :size="24"></star>
            <span class="director">{{item.director}}</span>
            <span class="casts">{{item.casts}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import star from "components/star/star"
export default {
  props:{
    ranklist:{
      type:Array
    }
  },
  components:{
    star
  },
  methods:{
    tomovie(data){
      this.$router.push({
        path:`/movie/${data.id}`
      })
    }
  }
}

</script>
<style scoped lang="stylus">
@import "../../common/css/mixin.styl";
  .rank-list-wrapper
    background-color #fff
    z-index 999
    padding 51px 15px 0 15px
    .rank-item
      padding-top 30px
      .rank-rating
        margin 30px auto 
        text-align center
        position relative
        width 50%
        height 10px
        .item-border
          border-bottom-1px(#ccc)
        .item-num
          padding: 0 10px
          display: inline-block
          background-color: #fff
          position: absolute
          left: 50%
          top: -8px
          transform: translateX(-50%)
          font-size: 18px
          color: green
      .rank-info
        height 130px
        border 1px solid #ccc
        display flex
        padding 15px
        box-sizing border-box
        .info-image
          flex 70px 0 0 
          margin-right 10px
        .info-content
          flex 1
          padding-bottom 20px
          display flex
          overflow-x hidden
          justify-content space-around
          flex-direction: column
          .title
            font-size 16px
            color black 
          .director,.casts
            font-size 12px
            color #777
</style>