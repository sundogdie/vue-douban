<template>
  <div class="cele">
    <div class="fixed-title">
      <span class="back" @click="back()"><i class="icon-back"></i></span>
      <span class="icon">电影</span>
    </div>
    <scroll class="movie-detail" v-if="celebrityDetail.length!==0" :data="celebrityDetail">
      <div>
        <div class="movie-image">
          <img :src="getImages(celebrityDetail.avatars.large)"> 
        </div>
        <div class="celebrity-info">
          <div class="main">
            <h1 class="name-cn">{{celebrityDetail.name}}</h1>
            <span class="name-en">{{celebrityDetail.name_en}}</span>
            <div :class="hasClass()" @click="toggleActor">
              <i class="icon icon icon-collect"></i>
              <span class="text">收藏</span>
            </div>
          </div>
          <div class="brief">
            <div class="title">个人简介</div>
            <p class="text" @click="showinfo()">
              {{celebrityDetail.summary}}
              <span class="more"><i class="icon-keyboard_arrow_right"></i></span>
            </p>
          </div>
          <scroll class="works" :scrollX="true" :eventPassthrough="eventPassthrough" :data="works">
            <div ref="box">
              <h2 class="title">代表作品</h2>
              <div class="work-item" v-for="(item,index) in works" :key="index" @click="goMovie(item.id)">
                <img :src=getImages(item.image) width="90" height="120">
                <h3 class="item-title">{{item.title}}</h3>
                <star :score="item.rating"></star>
              </div>
            </div>  
          </scroll>
          <div class="allWorks" @click="getAllWorks(celeId)">
              查看全部作品
              <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>    
    </scroll>
    <loading v-if="celebrityDetail.length===0" class="full"></loading>
    <celeinfo :infoLists="celebrityDetail" ref="info"></celeinfo>
  </div>
</template>

<script>
import star from "components/star/star"
import scroll from 'components/scroll/scroll'
import loading from 'components/loading/loading'
import celeinfo from "components/cele-info/cele-info"
import {mapState,mapActions} from 'vuex'
import { createMovieList,Celebrity } from '../../common/js/movieList';
import { getCelebrity } from "../../common/js/getmovielist"
export default {
  data(){
    return{
      celeId:null,
      celebrityDetail:[],
      works:[],
      eventPassthrough:'vertical',
      celebrity: []
    }
  },
  computed: {
    ...mapState([
      'actor'
    ])
  },
  updated() {
    this._initContatner()
  },
  components:{
    star,
    celeinfo,
    scroll,
    loading
  },
  methods:{
    ...mapActions([
      'addActor','removeActor'
    ]),
    _initContatner() {
      let Width = 98 * this.works.length
      this.$refs.box.style.width = Width+'px'
    },
    toggleActor() {
      if(this.hasLike()){
        this.removeActor(this.celebrity)
      }else{
        this.addActor(this.celebrity)
      }
    },
    hasClass() {
      if(this.hasLike()){
        return 'has-actor'
      }else{
        return 'actor'
        console.log(1)
      }
    },
    hasLike() {
      const index = this.actor.findIndex((item) => {
        return item.id === this.celebrity.id
      })
      return index > -1
    },
    getAllWorks(name){
      this.$router.push({
          path: `/works/${name}`
      });
    },
    goMovie(index){
      this.$router.push({
        path:`/movie/${index}`
      })
    },
    showinfo(){
      this.$refs.info.show();
    },
    back(){
      this.$router.go(-1)
    },
    getImages( _url ){
      if( _url !== undefined ){
        let _u = _url.substring( 7 );
        return 'https://images.weserv.nl/?url=' + _u;
      }
    },
    _getCelebrity() {
      this.celeId=this.$route.params.key;
      getCelebrity(this.celeId).then((res) => {
        if (!this.$route.params.key) { // 防止快速切换报错
          return;
        }
        this.celebrityDetail = res;
        // 需要把影人作品包装成电影类，否则传递给vuex的类型会出现问题，即使以对象的格式只传入id，如果在跳转后的界面进行收藏操作也会由于数据不全影响收藏列表的展示
        let ret = [];
        res.works.forEach((item) => {
          ret.push(item.subject);
        });
        this.works = createMovieList(ret);
        // this._checkCollect();
        // 把影人包装成影人类，便于收藏和读取收藏
        const mainWorks = [];
        res.works.forEach((item) => {
          mainWorks.push(item.subject.title);
        });
        this.celebrity = new Celebrity({
          id: res.id,
          name: res.name,
          image: res.avatars.large,
          works: mainWorks.slice(0, 3).join('/')
        });
      });
    },
  },
  created(){
    this._getCelebrity()
  }
}

</script>
<style scoped lang="stylus">
.cele
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #555
  z-index 986
  .fixed-title
    height 40px
    width 100%
    position fixed
    top 0
    background-color rgba(85,85,85,.6)
    position relative
    color white
    z-index 999
    .back
      margin-left 15px
      left 6px
      line-height 40px
    .icon
      margin-left 15px
      font-size 16px
      line-height 40px
  .movie-detail
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 991
    overflow hidden
    background-color #fff
    .movie-image
      padding 50px 0 20px 0
      background-color #555
      text-align center
      z-index 1
      img 
        width 40%
    .celebrity-info
      background-color: white
      padding: 15px 20px 0 20px
      .main
        position: relative
        .name-cn
          font-size: 16px
          color: #333
        .name-en
          display: inline-block
          padding-top: 7px
          font-size: 14px
          color #777
        .actor
          position: absolute
          top: 0
          right: 0
          height: 30px
          line-height: 30px
          width: 80px
          text-align: center
          font-size: 14px
          border: 1px solid #42bd56
          border-radius: 10px
          color #42bd56
          .text
            color: #42bd56
          .icon
            display: inline-block
            vertical-align: middle
            color: #42bd56
        .has-actor
          position: absolute
          top: 0
          right: 0
          height: 30px
          line-height: 30px
          width: 80px
          text-align: center
          font-size: 14px
          border: 1px solid #fe9800
          border-radius: 10px
          color #fe9800
          .text
            color: #fe9800
          .icon
            display: inline-block
            vertical-align: middle
            color: #fe9800
      .brief
        position: relative
        margin-top: 30px
        font-size: 14px
        color #777
        .text
          position: relative
          // height: 60px
          padding-right: 15px
          display: -webkit-box
          -webkit-line-clamp: 3
          -webkit-box-orient: vertical
          overflow: hidden
          margin-top: 20px
          color: #333
          line-height: 20px
          .more
            position: absolute
            top: 50%
            transform: translateY(-50%)
            right: 0
            font-size: 22px
            color: #42bd56
      .works
        margin-top: 30px
        padding-bottom: 20px
        white-space: nowrap
        font-size: 0
        overflow hidden
        width 100%
        .title
            font-size: 14px
            padding-bottom: 20px
            color #777
        .work-item
            width: 90px
            padding-bottom 10px
            vertical-align: top
            display: inline-block
            margin-right: 8px
            font-size: 14px
            img
              height: 120px
              width: 90px
            .item-title
              color: #333
              text-align center
              text-overflow ellipsis
              white-space nowrap
              overflow hidden
              padding: 8px 0 5px 0
      .allWorks
        font-size: 14px
        padding-bottom 20px
        color #777
        i
          display: inline-block
          vertical-align: middle
          font-size: 22px
</style>