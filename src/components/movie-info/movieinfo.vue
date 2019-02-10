<template>
  <div class="movie-info">
    <div class="overall">
      <div class="desc">
        <span class="title">{{movieDetail.title}}</span>
        <span class="tag">{{tag}}</span>
        <span class="original-title">原名: {{movieDetail.original_title}}</span>
        <span class="pubdate">上映时间: {{pubdate}}</span>
        <span class="duration">片长: {{movieDetail.durations[0]}}</span>
      </div>
      <div class="rank">
        <span class='origin'>豆瓣评分</span>
        <span class="rating">{{movieDetail.rating.average}}</span>
        <star :size="24" :score="movieDetail.rating.average" :needNullStar="false"></star>  
        <span class="num">{{movieDetail.ratings_count}}人</span>
      </div>
    </div>
    <div class="operate">
      <div :class="wantClass()" @click="toggleWant">想看</div>
      <div :class="watchClass()" @click="toggleWatch">看过★★★★★  </div>
    </div>
    <div class="summary">
      <h1>剧情简介</h1>
      <p>&nbsp;&nbsp;&nbsp;{{movieDetail.summary}}</p>
    </div>
    <scroll class="casts" :data="allCasts" :scrollX="true" :eventPassthrough="eventPassthrough">
      <div ref="content">
        <h2>影人</h2>
        <div class="casts-item" v-for="(item,index) in allCasts" :key="index" @click="selectCelebrity(item.id)">
          <img v-lazy="getImages(item.avatars.large)" width="90" height="120">
          <h3>{{item.name}}</h3>
          <span v-if="item.isDirector">导演</span>
        </div>
      </div>
    </scroll>  
  </div>  
</template>

<script>
import star from "components/star/star"
import {mapActions,mapState} from 'vuex'
import { createLists } from "../../common/js/movieList"
import scroll from "components/scroll/scroll"
export default {
  props:{
    movieDetail:{
      type:Object
    }
  },
  components:{
    star,
    scroll
  },
  data() {
    return {
      eventPassthrough:'vertical'
    }
  },
  methods:{
    ...mapActions([
      'addWatchMovies','removeWatchMovies','addWantMovies','removeWantMovies'
    ]),
    getImages( _url ){
      if( _url !== undefined ){
        let _u = _url.substring( 7 );
        return 'https://images.weserv.nl/?url=' + _u;
      }
    },
    selectCelebrity(id) {
      this.$router.push({
        path:`/cele/${id}`
      })
    },
    _initWidth() {
      let Width = 98 * this.allCasts.length
      this.$refs.content.style.width = Width + 'px'
    },
    toggleWatch() {
      if(this.isWatch(this.watchedMovies)) {
        this.removeWatchMovies(createLists(this.movieDetail))
      }else {
        this.addWatchMovies(createLists(this.movieDetail))
      }
    },
    toggleWant() {
      if(this.isWatch(this.wantedMovies)){
        this.removeWantMovies(createLists(this.movieDetail))
        console.log(0)
      }else {
        this.addWantMovies(createLists(this.movieDetail))
      }
    },
    isWatch(data) {
      const index = data.findIndex((item) => {
        return item.id === this.movieDetail.id
      })
      return index > -1
    },
    watchClass() {
      if(this.isWatch(this.watchedMovies)) {
        return 'watch'
      }else {
        return 'no-watch'
      }
    },
    wantClass() {
      if(this.isWatch(this.wantedMovies)) {
        return 'want'
      }else {
        return 'no-want'
      }
    }
  },
  mounted () {
    this._initWidth()
  },
  computed:{
    ...mapState([
      'watchedMovies','wantedMovies'
    ]),
    tag(){
      let year=this.movieDetail.year;
      let tag = this.movieDetail.genres.join('/');
      return `${year}/${tag}`
    },
    pubdate() {
      let pubdate = '';
      let date = this.movieDetail.pubdates;
      for (let i = 0; i < date.length; i++) {
        if (date[i].indexOf('电影节') === -1) {
          pubdate = date[i]; // 没有在中国大陆上映，取不为电影节的最后一个信息
        }
        if (date[i].indexOf('中国大陆') > -1) {
          pubdate = date[i];
          break;
        }
      }
      if (!pubdate) {
        pubdate = '暂无信息';
      }
      return pubdate;
    },
    allCasts() { // 获取导演和演员的分组
      let removeIndex = [];
      this.movieDetail.directors.forEach((item, index) => {
        item.isDirector = true;
        if (item.avatars === null) { // 有的导演不存在照片
          removeIndex.push(index);
        }
      });
      // for (let i = removeIndex.length; i > 0; i--) { // 移除信息不完全的导演
      //   this.movieDetail.directors.splice(removeIndex[i - 1], 1);
      // }
      removeIndex = []; // 重置移除清单
      this.movieDetail.casts.forEach((item, index) => {
        // console.log(index);
        if (item.avatars === null) { // 有的演员不存在照片
          removeIndex.push(index);
        }
      });
      // for (let i = removeIndex.length; i > 0; i--) { // 移除信息不完全的演员
      //   this.movieDetail.casts.splice(removeIndex[i - 1], 1);
      // }
      return this.movieDetail.directors.concat(this.movieDetail.casts);
    },
  }
}

</script>
<style scoped lang="stylus">
.movie-info
  padding 0 20px
  background-color #fff
  .overall
    display flex
    height 140px
    width 100%
    justify-content space-between
    .desc
      flex 70% 0 0
      display flex
      flex-direction column
      justify-content space-around
      .title
        font-size 18px
        color #333
        padding 10px 0 5px 0
      .tag,.original-title,.pubdate,.duration
        font-size 12px 
        color #777
    .rank
      height 70px
      margin-top 15px
      display flex
      padding 10px 15px
      background-color #f8f8f8
      box-shadow 0 0 5px #ccc
      justify-content space-between
      align-content center
      flex-direction column
      span
        font-size 12px
        color #777
        text-align center
      .rating
        font-size 18px
        color #333
  .operate
    display flex
    margin-top 20px
    height 35px
    color #42bd56
    font-size 14px
    div
      border 1px solid #42bd56
      border-radius 5px
      text-align center
      line-height 30px
    .want
      flex 1
      margin-right 20px
      color #fe9800
      border 1px solid #fe9800
    .no-want
      flex 1
      margin-right 20px
    .no-watch
      flex 2
    .watch
      color #fe9800
      border 1px solid #fe9800
      flex 2
  .summary
    margin-top 20px
    padding-top 20px
    border-top 1px solid #ccc
    h1
      font-size 12px
      color #777
    p
      font-size 14px
      color #333
      padding-top 10px
      line-height 25px
  .casts
    padding 30px 0
    width 100%
    white-space nowrap
    overflow hidden
    color #777
    h2
      padding-bottom 20px
      font-size 14px
    .casts-item
      vertical-align top
      display inline-block
      width 90px
      margin-right 8px
      font-size 12px
      text-align center
      h3
        padding 5px 0
</style>