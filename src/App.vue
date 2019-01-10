<template>
  <div id="app">
    <router-view></router-view>
    <div class="footer">
      <router-link to="/show" class="tab">
        <span class="tab-icon">
          <i class="icon-video-camera"></i>
        </span>
        <span class="tab-link">
          热映
        </span>
      </router-link>
      <router-link to="/ranking" class="tab">
        <span class="tab-icon">
            <i class="icon-stats-bars"></i>
          </span>
          <span class="tab-link">
            排行
          </span>
      </router-link>
      <router-link to="/user" class="tab">
        <span class="tab-icon">
          <i class="icon-user"></i>
        </span>
        <span class="tab-link">
          我的
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
    }
  },
  methods:{
    
  },
}
</script>

<style lang="stylus" scoped>
@import "./common/css/var.styl";
  .footer
    position fixed
    bottom 0
    left 0
    right 0
    box-sizing border-box
    height 60px
    width 100%
    background white
    display flex 
    border-top 1px solid #42bd56
    z-index 985
    .tab
      flex 1
      display block
      text-align center
      display flex
      justify-content center
      align-items: center
      flex-direction: column
      .tab-icon
        font-size: $font-size-large-x
        color: $color-text
      .tab-link
        font-size $font-size-small
        color: $color-text
    .tab-active
      flex 1
      text-align center
      display flex
      justify-content center
      align-items: center
      flex-direction: column
      .tab-icon
        font-size: $font-size-large-x
        color $color-theme-f
      .tab-link
        font-size $font-size-small
        color $color-theme-f
</style>
