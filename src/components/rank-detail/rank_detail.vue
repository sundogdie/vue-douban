<template>
  <div class="rank-wrapper">
    <div class="rank-title">
      <span class="rank-icon" @click="goRanking"><i class="icon-back"></i></span>
      <span class="title-name">{{rankType}}</span>
    </div>
    <ranklist :ranklist="ranklist"></ranklist>
    <loading :class="{'full':ranklist.length===0}" v-if="ranklist.length!=start"></loading>
    <div class="moremovie" @click="loadmore" v-if="ranklist.length===start&&hasmore">加载更多...</div>
  </div>
</template>

<script>
import ranklist from 'components/ranklist/ranklist'
import loading from 'components/loading/loading'
import {getHotmovie} from "../../common/js/getmovielist"
import { createRankList } from "../../common/js/movieList"
export default {
  data(){
    return{
      rankType:null,
      dataFn:null,
      start:0,
      count:15,
      ranklist:[],
      hasmore:true
    }
  },
  destroyed(){
    this.$emit('activeShow',true);
  },
  methods:{
    goRanking(){
      this.$router.push({
        path:"/ranking"
      })
    },
    loadmore(){
      getHotmovie(this.start,this.count,this.dataFn).then(res=>{
          this.ranklist=this.ranklist.concat(createRankList(res.subjects));
          this._checkMore(res);
      });
      this.start+=this.count;
    },
    _checkMore(data) {
      const movies = data.subjects;
      if (!movies.length||movies.length<this.start) {
        this.start=this.ranklist.length;
        this.hasmore=false
      }//判断是否还有数据 
    },  
    getListPath(){
      let param=this.$route.params.ranktype;
      switch (param) {
        case 'top250':
          this.dataFn = "/v2/movie/top250";
          this.rankType = '豆瓣 Top250';
          break;
        case 'weekly':
          this.dataFn = '/v2/movie/weekly';
          this.rankType = '本周口碑榜';
          break;
        case 'newmovie':
          this.dataFn = '/v2/movie/new_movies';
          this.rankType = '新片榜';
          break;
        case 'usamovie':
          this.dataFn = '/v2/movie/us_box';
          this.rankType = '北美票房榜';
          break;
      };
    }
  },
  components:{
    ranklist,
    loading,
  },
  created(){
    this.getListPath();
    this.loadmore();
    this.$emit('activeShow',false)
  }
}

</script>
<style scoped lang="stylus">
  .rank-wrapper
    position relative
    top 0
    left 0
    right 0
    bottom 0
    z-index 999
    background-color white
    .rank-title
      position fixed
      top 0
      height 50px
      width 100%
      background-color white
      border-bottom 1px solid #ccc
      z-index 998
      .rank-icon
        margin 0 15px 0 15px
        line-height 50px
        color #42bd56
    .moremovie
      width 335px
      height 35px
      line-height 35px
      text-align center
      color green
      margin 10px auto
      border-radius 10px
      background-color #ccc
</style>