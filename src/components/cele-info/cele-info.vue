<template>
  <transition name="slide">
    <div class="info-wrapper" v-show="showFlag">
      <div class="fixed-title">
      <span class="back" @click="close">
        <i class="icon-close"></i>
      </span>
        <span class="type">
        影人简介
      </span>
      </div>
      <div class="celebrity-info">
        <div class="scroll-wrapper">
          <h1 class="name">{{infoLists.name}}</h1>
          <h2 class="name-en">{{infoLists.name_en}}</h2>
          <div class="info-lists">
            <div class="gender">
              <span class="item">性别:</span>
              <span>{{infoLists.gender ? infoLists.gender : '暂无信息'}}</span>
            </div>
            <div class="constellation">
              <span class="item">星座:</span>
              <span>{{infoLists.constellation ? infoLists.constellation : '暂无信息'}}</span>
            </div>
            <div class="birthday">
              <span class="item">出生日期:</span>
              <span>{{infoLists.birthday ? infoLists.birthday : '暂无信息'}}</span>
            </div>
            <div class="born-place">
              <span class="item">出生地:</span>
              <span>{{infoLists.born_place ? infoLists.born_place : '暂无信息'}}</span>
            </div>
            <div class="more-name">
              <span class="item">更多中文名:</span>
              <span class="more">{{getNames(infoLists.aka)}}</span>
            </div>
          </div>
          <p class="summary">{{infoLists.summary}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['infoLists'],
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      close() {
        this.showFlag = false;
      },
      show() {
        this.showFlag = true;
      },
      getNames(lists) {
        if (!lists || lists.length === 0 || lists[0] === '') {
          return '暂无信息';
        }
        return lists.join('/');
      }
    },
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .info-wrapper
    position: fixed
    top: 0
    width: 100%
    bottom: 0
    z-index: 999
    background-color: white
    &.slide-enter-active,&.slide-leave-active
      transition: all 0.3s
    &.slide-enter,&.slide-leave-to
      transform: translate3d(0, 100%, 0)
    .fixed-title
      position: fixed
      top: 0
      width: 100%
      height: 40px
      z-index: 100
      text-align: center
      background-color: white
      color: #777
      font-weight 600
      .back
        position: absolute
        top: 0px
        left: 6px
        z-index: 50
        .icon-close
          display: block
          padding: 11px
          font-size: 12px
      .type
        display: inline-block
        padding-top: 12px
        font-size: 14px
    .celebrity-info
      position: fixed
      top: 0
      width: 100%
      bottom: 0
      .scroll-wrapper
        padding: 50px 20px 10px 20px
        color: #333
        .name
          margin-top: 30px
          font-size: 18px
          font-weight: 600
        .name-en
          margin-top: 10px
          font-size: 12px
        .info-lists
          padding: 20px 0
          font-size: 14px
          div
            line-height: 25px
            font-size: 0
            span
              vertical-align: middle
              font-size: 14px
            .item
              display: inline-block
              width: 80px
          .more-name
            display: flex
            align-items: top
            .item
              flex: 80px 0 0
              width: 80px
            .more
              flex: 1
        .summary
          font-size: 14px
          line-height: 22px

</style>
