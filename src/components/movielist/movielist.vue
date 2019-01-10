<template>
  <div>
    <ul>
      <li class="item" v-for="(item,index) in movies" :key="index" @click="goMovieDetail(item.id)">
        <div class="img">
          <img v-lazy="item.image" height="120" width="80">
        </div>
        <div class="content">
          <span class="title">{{item.title}}</span>
          <star :score="item.rating"></star>
          <span class="director">导演:{{item.director}}</span>
          <span class="casts">主演:{{item.casts}}</span>
          <span class="haswatched">{{item.collectCount}}人看过</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import star from "components/star/star.vue"
export default {
  props:{
    movies:{
      type:Array,
    },
  },
  data(){
    return {
    }
  },
  components:{
    star,
  },
  methods:{
    goMovieDetail(id){
      this.$router.push({
        path:`/movie/${id}`
      })
    }
  }
}

</script>
<style scoped lang="stylus">
  .item
    padding 15px 0
    display flex
    align-items center
    .img
      flex 80px 0 
      margin-right 10px
    .content
      flex 1
      height 120px
      display flex
      flex-direction column
      justify-content space-around
      color #333
      .title
        font-size 16px
      .director,.casts,.haswatched
        font-size 12px
      .haswatched
        color  #42bd56
</style>