<template>
  <div class="movie">
    <div class="fixed-title">
      <span class="back" @click="back"><i class="icon-back"></i></span>
      <div class="icon"><i class="icon-video-camera center"></i><i class="icon-text">&nbsp;电影</i></div>
    </div>
    <scroll class="movie-detail" v-if="movieDetail.length!==0" :data="movieDetail">
      <div>
        <div class="movie-image">
          <img v-lazy="replaceUrl(movieDetail.images.large)"> 
        </div>
        <movieinfo :movieDetail="movieDetail"   v-if="movieDetail.length!==0"></movieinfo>
        <div class="switch">
          <div class="tab" :class="{'active':currindex===index}"
            v-for="(tab,index) in tab" :key="index" @click="switchs(index)">{{tab.value}}</div>
        </div>
        <comment :movie_comment="movieDetail.popular_comments" :Cnum="movieDetail.comments_count" v-if="currindex===0" @goallcomment="goallcomment"></comment>
        <review :movie_review="movieDetail.popular_reviews.slice(0,5)" v-else :num="movieDetail.reviews_count" @goallreview="goallreview" @selectReview="selectReview"></review>
      </div>
    </scroll>
    <loading class="full" v-if="!movieDetail.images"></loading>
    <router-view></router-view> 
  </div>
</template>

<script>
import movieinfo from "components/movie-info/movieinfo"
import star from "components/star/star"
import scroll from 'components/scroll/scroll'
import comment from "components/movie-comment/comment"
import review from "components/movie-review/review"
import loading from "components/loading/loading"
import { getMovieDetail } from "../../common/js/getmovielist"
  export default {
    created() {
      this.getMovie()
    },
    data(){
      return{
        movieDetail:[],
        currindex:0,
        tab:[{value:"短评"},{value:"影评"}]
      }
    },
    components:{
      loading,
      review,
      comment,
      star,
      movieinfo,
      scroll
    },
    methods:{
      getMovie(){
        const id=this.$route.params.id;
        getMovieDetail(id,"/v2/movie/subject/").then(res=>{
          this.movieDetail=res
        })
      },
      selectReview(id){
        this.$router.push({
          path:`/movie/${this.movieDetail.id}/review/${id}`
        })
      },
      goallcomment(){
        this.$router.push({
          path:`${this.movieDetail.id}/comments`
        })
      },
      goallreview(){
        this.$router.push({
          path:`${this.movieDetail.id}/reviews`
        })
      },
      replaceUrl(srcUrl) {
        if (srcUrl !== undefined) { // 图片防盗链处理
          return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
        }
      },
      back(){
        this.$router.go(-1)
      },
      switchs(index) {
        this.currindex=index
      },
      selectCelebrity(key){
        this.$router.push({
          path:`/cele/${key}`
        })
      }
    },
    
  }

</script>
<style scoped lang="stylus">
.movie
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 989
  background-color #777
  .fixed-title
    height 40px
    width 100%
    background-color rgba(85,85,85,.6)
    position relative
    color white
    z-index 990
    .back
      position absolute
      left 6px
      line-height 40px
    .icon
      margin 0 auto
      width 70px
      font-size 22px
      height 40px
      position relative
      line-height 40px
      .center
        line-height 40px
      .icon-text
        font-size 16px
        position absolute
        top 50%
        transform translateY(-50%)
        line-height 40px
  .movie-detail
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 989
    overflow hidden
    background-color #555
    .movie-image
      padding 50px 0 20px 0
      background-color #555
      text-align center
      z-index 1
      img 
        width 50%
    .switch
      display flex
      padding-top 20px
      margin-bottom -45px
      border-top 1px solid #ccc
      background-color #fff
      .tab
        flex 1
        color #777
        padding 15px
        text-align center
        &.active
          color  #42bd56
          border-bottom 1px solid #42bd56
</style>