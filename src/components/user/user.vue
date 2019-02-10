<template>
  <div class="user">
    <div class="us-head">
      <div class="photo"><img src="static/fix.jpg" height="80" width="87"></div>
      <div class="name">豆瓣用户路人甲</div>
    </div>
    <div class="use-tab">
      <div class="tab-item" @click="tabCurrent(0)" :class="{'active':currindex===0}">想看</div>
      <div class="tab-item" @click="tabCurrent(1)" :class="{'active':currindex===1}">看过</div>
      <div class="tab-item" @click="tabCurrent(2)" :class="{'active':currindex===2}">影人</div>
    </div>
    <scroll :data="list" class="container">
      <div>
        <rank-list :ranklist="list" v-if="currindex!==2" :show="false">
          <div class="tc"></div>
        </rank-list>
        <cele-list v-else :cele="list">
          <div class="tc"></div>
        </cele-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from 'components/scroll/scroll'
import CeleList from 'components/cele-list/cele-list'
import {mapState} from 'vuex'
import RankList from 'components/ranklist/ranklist'
export default {
  data(){
    return{
      currindex: 0,
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    tabCurrent(index) {
      this.currindex = index
      this.getList()
    },
    getList() {
      switch (this.currindex) {
        case 0:
          this.list = this.wantedMovies
          break;
        case 1:
          this.list = this.watchedMovies
          break;
        case 2:
          this.list = this.actor
          break;
      }
    }
  },
  computed: {
    ...mapState([
      'wantedMovies','watchedMovies','actor'
    ])
  },
  components: {
    scroll,
    RankList,
    CeleList
  }
}

</script>
<style scoped lang="stylus">
  .user
    position fixed
    top 0
    left 0
    right 0
    bottom 60px
    .us-head
      padding 35px 20px
      height 80px
      background  linear-gradient(#42bd56,#9ad57f)
      .photo
        border-radius 50%
        width 80px
        height 80px
        overflow hidden
        float left
      .name
        line-height 80px
        margin-left 20px
        float left
        color white
    .use-tab
      width 100%
      height 47px
      display flex
      .tab-item
        flex 1
        height 100%
        line-height 47px
        text-align center
        color #777
        box-sizing border-box 
        &.active
          color green
          border-bottom 1px solid green
    .container
      height 100%
      .tc
        height 200px
        width 100%
</style>