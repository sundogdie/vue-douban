<template>
  <div class="suggest-wrapper">
    <movielist :movies="results"></movielist>
    <div class="no-result" v-if="noResult">抱歉，暂无搜索结果 :(</div>
  </div>
</template>

<script type="text/ecmascript-6">
import movielist from 'components/movielist/movielist';
import { movieSearch, tagSearch } from '../../common/js/getmovielist';
import { createSearchList } from "../../common/js/movieList"
const SEARCH_MORE = 20;
  export default {
    props: {
      query: {
        type: String,
        defaults: ''
      },
      tagSearch: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dataFn:null,
        searchIndex:0,
        noResult:false,
        results:[]
      };
    },
    components:{
      movielist
    },
    created() {
      this._selectType();
      this.search();
    },
    watch: {
      query() {
        if(this.query!==null){
          this.search()
        }else{
          alert(1)
        }
      }       
    },
    methods: {
      search() {
        // 首先需要重置一些状态
        this.result = [];
        this.dataFn(this.query, this.searchIndex, SEARCH_MORE).then((res) => {
          // const queryRet = res.title.split('"');
          // if (this.query !== queryRet[1]) { // 防止由于加载缓慢，之前废弃的数据篡改当前数据
          //   console.log('old request + 1', queryRet[1]);
          //   return; // 舍弃过时的请求
          // }
          if (!res.subjects.length) { // 判断是否存在搜索结果
            this.noResult = true;
          } else {
            this.noResult = false;
          }
          this.results = createSearchList(res.subjects);
          this._checkMore(res);
          // console.log(this.result);
        });
      },    
      getPubdate(date) {
        let pubdate = '';
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
          return '';
        }
        return '/' + pubdate;
      },
      replaceUrl(srcUrl) {
        if (srcUrl !== undefined) { // 图片防盗链处理
          return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
        }
      },
      _checkMore(data) {
        let movies = data.subjects;
        if (!movies.length || data.start + data.count >= data.total) {
          this.hasMore = false;
        }
      },
      _selectType() {
        this.dataFn = this.tagSearch ? tagSearch : movieSearch;
      },     
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .suggest-wrapper
    position fixed
    top 0 
    left 0
    right 0
    bottom 0
    margin-top 50px
    z-index 999
    background-color #fff
    overflow-x hidden
    .no-result
        position: absolute
        top: 50%
        width: 100%
        text-align: center
        color #777
</style>
