<template>
  <div class="works-wrapper">
    <div class="fixed-title">
      <span class="back" @click="back">
        <i class="icon-back"></i>
      </span>
      <span class="type">全部作品</span>
      <span class="to-top" @click="toTop">
        <i class="icon-circle-up"></i>
      </span>
    </div>
    <div class="celebrity-works">
      <div class="scroll-wrapper">
        <movielist :movies="works"></movielist>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import movielist from 'components/movielist/movielist';
  import { getCelebrityWorks } from '../../common/js/getmovielist';
  import { createRankList } from '../../common/js/movieList';
  const SEARCH_MORE = 20;
  export default {
    data() {
      return {
        needRank: false,
        searchIndex: 0,
        works: [],
        fullScreen: true,
        hasMore: true,
        pullup: true,
        currentCelebrityId:null
      };
    },
    created() {
      this._getWorks();
    },
    methods: {
      back() {
        this.$router.back();
      },
      toTop() {
        this.$refs.scroll.scrollTo(0, 0, 200);
      },
      selectMovie(movie) {
        this.setMovie(movie);
        this.$router.push({
          path: `/movie/${movie.id}`
        });
      },
      _getWorks() {
        this.currentCelebrityId=this.$route.params.name;
        getCelebrityWorks(this.currentCelebrityId, this.searchIndex, SEARCH_MORE).then((res) => {
          let ret = [];
          res.works.forEach((item) => {
            ret.push(item.subject);
          });
          this.works = createRankList(ret);
          this._checkMore(res);
          console.log(res);
        });
      },
      _checkMore(data) {
        let works = data.works;
        if (!works.length || data.start + data.count >= data.total) {
          this.hasMore = false;
        }
      },
    },
    components: {
      movielist,
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .works-wrapper
    height: 100%
    position: relative
    z-index: 990
    background-color: white
    .fixed-title
      border-bottom 1px solid #ccc
      position: fixed
      top: 0
      width: 100%
      height: 50px
      z-index: 991
      background-color: white
      text-align: center
      .back
        position: absolute
        top: 0px
        left: 6px
        z-index: 50
        .icon-back
          display: block
          padding: 15px
          font-size: 14px
          color: #777
      .type
        line-height: 50px
        font-size: 16px
        text-align center
        color #777
      .to-top
        position: absolute
        top: 0
        right: 6px
        z-index: 50
        .icon-circle-up
          display: block
          padding: 15px
          font-size: 16px
          color: #42bd56
    .celebrity-works
      position: fixed
      left 0
      right 0
      top: 0
      bottom: 0
      z-index 990
      overflow-x hidden
      width: 100%
      background-color: white
      .scroll-wrapper
        background-color #fff
        padding: 50px 0 30px 0

</style>
