<template>
  <scroll :data="movies" @scrolltoEnd="getMovie" :pullup="true" class="movie-content">
    <ul>
      <li class="item" v-for="(item,index) in movies" :key="index" @click="goMovieDetail(item.id)">
        <div class="img">
          <img v-lazy="getImages(item.image)" height="120" width="80">
        </div>
        <div class="content">
          <span class="title">{{item.title}}</span>
          <star :score="item.rating"></star>
          <span class="director">导演:{{item.director}}</span>
          <span class="casts">主演:{{item.casts}}</span>
          <span class="haswatched">{{item.collectCount}}人看过</span>
        </div>
      </li>
      <loading v-if="!movies.length||currentIndex>movies.length" :class="{'full':movies.length===0}"></loading>
    </ul>
  </scroll>
</template>

<script>
import star from "components/star/star.vue"
import scroll from 'components/scroll/scroll'
import loading from 'components/loading/loading'
import { createMovieList } from '../../common/js/movieList'
import { getHotmovie } from "../../common/js/getmovielist"
export default {
  props:{
    URL:{
      type:String,
    },
  },
  data(){
    return {
      movies: [],
      counts:10,
      loadMore: true,
      currentIndex: 0
    }
  },
  created() {
    this.getMovie()
  },
  components:{
    star,
    scroll,
    loading
  },
  methods:{
    goMovieDetail(id){
      this.$router.push({
        path:`/movie/${id}`
      })
    },//进入电影详情
    getImages( _url ){
      if( _url !== undefined ){
        let _u = _url.substring( 7 );
        return 'https://images.weserv.nl/?url=' + _u;
      }
    },//图片防盗链
    getMovie(){
      if(!this.loadMore) {
        return
      }
      getHotmovie(this.currentIndex,this.counts,this.URL).then(res=>{        
        this.movies=this.movies.concat(createMovieList(res.subjects));
        this._checkMore(res);
          // this.hotmovieindex=this.hotMovie.length;
      });
      this.currentIndex+=this.counts; 
    },
    _checkMore(data) {
      const movie = data.subjects;
      if (!movie.length || data.start + data.count > data.total) {
        this.currentIndex=this.movies.length
        this.loadMore = false
      }
    }
  }
}

</script>
<style scoped lang="stylus">
  .movie-content
    height 100%
    overflow hidden
    ul
      overflow hidden
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