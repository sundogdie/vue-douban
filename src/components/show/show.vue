<template>
  <div class="show">
    <div class="header-fixed">
      <div class="search" @click="gosearch">
        <div class="logo">
          <img src="./douban-logo.png" width="35" height="35">
        </div>
        <div class="search-content">
          <i class="icon-search"></i>
          <span>电影/影人/标签</span>
        </div>
      </div>
      <div class="switch-tab" >
          <div class="switch-tab-item" @click="switchitem(index)" v-for="(item,index) in switchlist" :key="index"
          :class="{'active':currentIndex===index}">{{item.name}}</div>
      </div>
    </div>
    <div class="container">
      <div v-show="currentIndex===0">
        <movielist :movies="hotMovie" v-if="currentIndex===0"></movielist>
        <div class="moremovie" @click="loadmore" v-if="hotmovieindex===hotMovie.length&&hotopen">加载更多...</div>
      </div>
      <div v-show="currentIndex===1">
        <movielist :movies="comingMovies" v-if="currentIndex===1"></movielist>
        <div class="moremovie" @click="loadmore" v-if="commovieindex===comingMovies.length&&comopen">加载更多...</div>
      </div>
      <loading v-if="hotmovieindex!=hotMovie.length||commovieindex!=comingMovies.length" :class="{'full':hotMovie.length===0}"></loading>
      <!-- 尴尬的逻辑 -->
    </div>
  </div>
</template>

<script>
import movielist from "components/movielist/movielist.vue"
import loading from "components/loading/loading.vue"
import { createMovieList } from '../../common/js/movieList'
import { getHotmovie } from "../../common/js/getmovielist"
export default {
  data(){
    return{
      switchlist:[
        {name:'正在热映'},
        {name:'即将上映'}
      ],
      currentIndex:0,
      hotMovie:[],
      comingMovies: [],
      hotmovieindex:0,
      commovieindex:0,
      counts:10,
      hotopen:true,
      comopen:true,
    }
  },
  components:{
    "movielist":movielist,
    "loading":loading
  },
  created(){
    this.getMovie()
  },
  mounted(){
    this.getCmovie()
  },
  methods:{
    gosearch(){
      this.$router.push({
        path:"/search"
      })
    },
    //跳转搜索路由
    switchitem(index){
      this.currentIndex=index
    },
    //tab切换
    getMovie(){
      getHotmovie(this.hotmovieindex,this.counts,"/v2/movie/in_theaters").then(res=>{        
        this.hotMovie=this.hotMovie.concat(createMovieList(res.subjects));
        this._checkMore(res);
          // this.hotmovieindex=this.hotMovie.length;
      });
      this.hotmovieindex+=this.counts; 
    },
    getCmovie(){
      getHotmovie(this.commovieindex,this.counts,"v2/movie/coming_soon").then(res=>{
        this.comingMovies=this.comingMovies.concat(createMovieList(res.subjects));
        this._checkMore(res)
      }),
      this.commovieindex+=this.counts;
    },
    _checkMore(data) {
      const movies = data.subjects;
      if (!movies.length || data.start + data.count > data.total) {
        if (this.currentIndex === 0) {
          this.hotopen = false;
          this.hotmovieindex=this.hotMovie.length
        } else {
          this.comopen = false;
          this.commovieindex=this.comingMovies.length
        }
      }
    },
    loadmore(){
      if(this.currentIndex===0){
        this.getMovie();
      }else{
        this.getCmovie();
      }
    }
    //加载更多电影
  }
}

</script>
<style scoped lang="stylus">
  .header-fixed
    position fixed
    top 0
    left 0
    height 97px
    width 100%
    background-color white
    z-index 999
    .search
      height 50px
      width 100%
      padding 10px 10px 5px 10px
      display flex
      align-items  center
      box-sizing border-box
      .logo
        width 35px
        height 35px
        padding-right 15px
      .search-content
        flex 1
        text-align center
        line-height 35px
        background-color: #eee
        font-size: 16px
        border-radius 5px
        color #777
    .switch-tab
      display flex
      height 47px
      width 100%
      .switch-tab-item
        flex 1
        text-align center
        font-size 16px
        height 100%
        line-height 47px
        color #777
        box-sizing border-box
        &.active
          color #42bd56
          border-bottom 1px solid #42bd56
  .container
    margin-top 97px
    margin-bottom 60px
    padding 0 10px 0 10px
    overflow hidden
    z-index 1
    .moremovie
      width 100%
      height 35px
      line-height 35px
      text-align center
      color green
      margin-bottom 10px
      background-color #ccc
</style>