<template>
  <div class="ranking">
    <div class="search" @click="gosearch">
      <div class="logo">
        <img src="./douban-logo.png" width="35" height="35">
      </div>
      <div class="search-content">
        <i class="icon-search"></i>
        <span>电影/影人/标签</span>
      </div>
    </div>
    <div class="ranklist" v-if='show'>
      <h1 class="title">精选榜单</h1>
      <router-link to="ranking/top250">
        <div class="rank-item top250">
          <div class="desc">
            <h2 class="desc-title">豆瓣 Top250</h2>
            <span class="desc-next-title">8分以上好电影</span>
          </div>
          <div class="rank-img">
              <img v-for="(item,index) in urlList[0]" :src="replaceUrl(item)" :key="index" :class="{'top': index === 1 }"/>
          </div>
        </div>
      </router-link>
     <router-link  to="ranking/weekly">
        <div class="rank-item weekly">
          <div class="desc">
            <h2 class="desc-title">本周口碑榜</h2>
            <span class="desc-next-title">{{weekdate}}</span>
          </div>
          <div class="rank-img">
            <img v-for="(item,index) in urlList[1]" :src="replaceUrl(item)" :key="index" :class="{'top': index === 1 }"/>
          </div>
        </div>
     </router-link>
      <router-link to="ranking/newmovie">
        <div class="rank-item new-movie">
          <div class="desc">
            <h2 class="desc-title">新片榜</h2>
            <span class="desc-next-title">{{weekdate}}</span>
          </div>
          <div class="rank-img">
            <img v-for="(item,index) in urlList[2]" :src="replaceUrl(item)" :key="index" :class="{'top': index === 1 }"/>
          </div>
        </div>
      </router-link>
      <router-link to="ranking/usamovie">
        <div class="rank-item us-box">
          <div class="desc">
            <h2 class="desc-title">北美票房榜</h2>
            <span class="desc-next-title">票房最高排名</span>
          </div>
          <div class="rank-img">
            <img v-for="(item,index) in urlList[3]" :src="replaceUrl(item)" :key="index" :class="{'top': index === 1 }"/>
          </div>
        </div>
      </router-link>
    </div>
    <router-view @activeShow="active"></router-view>
  </div>
</template>

<script>
import loading from 'components/loading/loading'
import WeekDate from '../../common/js/getWeekDate.js'
import { getHotmovie } from '../../common/js/getmovielist'
export default {
  methods:{
    gosearch(){
      this.$router.push({
        path:"/search"
      })
    },
    active(s){
      this.show=s
    },//进入排行详情隐藏外部组件

    getUrlList(url) { // 获取处理过的图片集合，各个排行榜数据结构不一致需要处理
      let list = [];
      url.forEach((item, index) => {
        let subject = item.subjects.slice(0, 3);
        list[index] = [];
        subject.forEach((item) => {
          list[index].push(item.subject ? item.subject.images.medium : item.images.medium);
        });
      });
      list.forEach((item) => { // 将第二名排到第一位
        let url = item[0];
        item[0] = item[1];
        item[1] = url;
      });
      this.urlList = list;
    },
    _getBriefRank() {
      Promise.all([getHotmovie(0,3,"/v2/movie/top250"),getHotmovie(0,3,'/v2/movie/weekly'),getHotmovie(0,3,'/v2/movie/new_movies'),getHotmovie(0,3,'/v2/movie/us_box')]).then((res) => {
        this.getUrlList(res);
      });
    },
    replaceUrl(srcUrl) {
      if (srcUrl !== undefined) { // 图片防盗链处理
        return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
      }
    },
  },
  created(){
    let date = new WeekDate();
    this.weekdate = date.getWeekStartDate() + ' - ' + date.getWeekEndDate();
    this._getBriefRank()
  },
  data(){
    return{
      show:true,
      weekdate:null,
      urlList:null
    }
  },
  components:{
    loading
  }
}

</script>
<style scoped lang="stylus">
  .ranking
    display block
    .search
      height 50px
      width 100%
      z-index 999
      background-color white
      position fixed
      top 0
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
    .ranklist
      padding 0 15px 15px 15px
      margin 50px 0 60px 0
      z-index 100
      .title
        padding-top 20px
        color #333
      .rank-item
        margin-top 15px
        height 130px
        border-radius 10px
        color #fff
        word-wrap 100%
        .desc
          width 40%
          padding-top 50px
          text-align center
          display inline-block
          .desc-title
            font-size 18px
          .desc-next-title
            font-size 12px
        .rank-img
          vertical-align: top
          display: inline-block
          width: 55%
          height: 100%
          text-align: center
          img
            display: inline-block
            vertical-align: text-top
            position: relative
            top: 50%
            transform: translateY(-50%)
            width: 30%
            &.top
              width: 35%
      .top250
        background: linear-gradient(#E1A708,#EFD491)
      .weekly
        background: linear-gradient(#32C05E,#A1E5BE)
      .new-movie
        background: linear-gradient(#A361C3,#D9B9E8)
      .us-box
        background: linear-gradient(#DD7286,#F3B9C5)
</style>