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
      <movielist :URL="Url_index[0]" v-show="currentIndex===0"></movielist>
      <movielist :URL="Url_index[1]" v-show="currentIndex===1"></movielist>
    </div>
  </div>
</template>

<script>
import movielist from "components/movielist/movielist.vue"
import loading from "components/loading/loading.vue"
export default {
  name:'show',
  data(){
    return{
      switchlist:[
        {name:'正在热映'},
        {name:'即将上映'}
      ],
      Url_index:['/v2/movie/in_theaters','v2/movie/coming_soon'],
      currentIndex:0,
    }
  },
  components:{
    movielist,
    loading
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
  }
}

</script>
<style scoped lang="stylus">
  .header-fixed
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
    padding 0 10px 0 10px
    overflow hidden
    z-index 1
    position fixed
    top 97px
    bottom 60px
    .moremovie
      width 100%
      height 35px
      line-height 35px
      text-align center
      color green
      margin-bottom 10px
      background-color #ccc
</style>