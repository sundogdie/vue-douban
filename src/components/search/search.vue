<template>
  <div>
    <div class="search-box">
      <i class="icon-search"></i>
      <input type="text" class="box" :placeholder="placeholder" v-model="query">
      <span class="cancel" @click="back">取消</span>
    </div>
    <searchview :query="query"></searchview>
  </div>
</template>

<script>
import searchview from "components/search-view/search-view"
export default {
  methods:{
    back(){
      this.$router.back()
    },   
  },
  created(){
  },
  data(){
    return {
      query:'',
      placeholder:'搜索电影/影人',
    }
  },
  components:{
    searchview
  }
}

</script>
<style scoped lang="stylus">
  .search-box
    box-sizing: border-box
    width: 100%
    display: flex
    align-items: center
    padding: 10px 0px 10px 20px
    height: 50px
    background: #42bd56
    .icon-search
      position: absolute
      top: 18px
      left: 28px
      font-size: 14px
      color: #777
    .box
      flex: 75% 0 0
      padding-left: 30px
      height: 30px
      line-height: 30px
      border-radius: 5px
      background: white
      color: #777
      font-size: 14px
      caret-color: #777
      &::placeholder
        color: #777
    .cancel
      flex: 1
      text-align: center
      font-size: 16px
      color: white
</style>