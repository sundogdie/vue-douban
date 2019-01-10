<template>
  <div class="review-wrapper">
    <div class="fixed-title">
      <span class="back" @click="back">
        <i class="icon-back"></i>
      </span>
      <span class="type">影评</span>
    </div>
    <div class="review-detail" :data="reviewDetail">
      <div class="scroll-wrapper">
        <div class="review-content" v-if="reviewDetail.author">
          <h1 class="title">{{reviewDetail.title}}</h1>
          <div class="author">
            <div class="avatar">
              <img :src="reviewDetail.author.avatar" alt="" height="36" width="36">
            </div>
            <div class="info">
              <h2><span class="name">{{reviewDetail.author.name}}</span>的影评</h2>
              <span class="date">{{reviewDetail.created_at.split(' ')[0]}}</span>
              <star :size="24" :score="reviewDetail.rating.value*2"></star>
            </div>
          </div>
          <p class="desc" v-html="reviewDetail.content"></p>
          <div class="copyright">
            本文版权归 {{reviewDetail.author.name}} 所有，任何形式转载请联系作者
          </div>
          <div class="end">
            <div class="line"></div>
            <span class="text">THE END</span>
          </div>
          <div class="useful">
            <div class="use">
              有用({{reviewDetail.useful_count}})
            </div>
            <div class="no-use">
              没用({{reviewDetail.useless_count}})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from 'components/star/star';
  export default {
    data() {
      return {
        reviewDetail: {},
        currentReviewId:''
      };
    },
    created() {
      this.currentReviewId=this.$route.params.reviewId;
      this._getMovieReview(this.currentReviewId);
    },
    methods: {
      back() {
        this.$router.back();
      },
      _getMovieReview(id) {
        this.$axios.get(`/v2/movie/review/${id}`,{
          params:{"apikey":'0b2bdeda43b5688921839c8ecb20399b'}
        }).then(res=>{
          this.reviewDetail=res.data
        })
      }
    },
    components: {
      Star,
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .fixed-title
    border-bottom 1px solid #ccc
    position: fixed
    top: 0
    width: 100%
    height: 50px
    z-index: 998
    background-color: white
    .back
      position: absolute
      top: 0px
      left: 6px
      color: #42bd56
      z-index: 999
      .icon-back
        display: block
        padding: 15px
        font-size: 16px
    .type
      line-height: 50px
      font-size: 16px
      color #777
      padding-left: 60px
  .review-detail
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 997
    overflow-x: hidden
    background-color: white
    .review-content
      padding: 70px 20px 40px 20px
      .title
        font-size: 22px
        color: #333
        line-height: 30px
      .author
        margin-top: 20px
        display: flex
        align-items: top
        .avatar
          flex: 36px 0 0
          width: 36px
          img
            border-radius: 50%
        .info
          flex: 1
          padding-left: 10px
          font-size: 12px
          h2
            padding-bottom: 5px
            .name
              color: #333
              padding-right: 5px
          .star
            display: inline-block
      .desc
        margin-top: 30px
        color: #333
        line-height: 25px
        white-space: pre-wrap
      .copyright
        margin-top: 40px
        font-size: 12px
        text-align: center
      .end
        position: relative
        margin: 30px auto
        text-align: center
        height: 10px
        width: 60%
        .line
          border-bottom 1px solid #ccc
        .text
          padding: 0 10px
          display: inline-block
          background-color: white
          position: absolute
          left: 50%
          top: -8px
          transform: translateX(-50%)
          font-size: 12px
      .useful
        text-align: center
        div
          display: inline-block
          padding: 10px 15px
          margin-right: 10px
          color: #333
          font-size: 14px
          border: 1px solid #ccc
          border-radius: 5px
</style>
