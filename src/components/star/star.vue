<template>
  <div class="star" :class="starType">
    <span v-for="(item,index) in itemClasses" v-show="score>0" :key="index" class="star-item" :class="item"></span>
    <span class="show-score" v-if="score>0&&needNullStar">{{score}}</span>
    <span class="score-none" v-show="!score">暂无评分</span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
export default {
  props:{
    score:{
      type:Number
    },
    size: {
        type: Number,
        default: 24
    },
    needNullStar: {
        type: Boolean,
        default: true
    }
  },
  computed:{
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    },
    starType() {
        return 'star-' + this.size;
    },
  }
}

</script>
<style scoped lang="stylus">
@import "../../common/css/mixin.styl"
.star
    font-size: 0
  .show-score
    display inline-block
    font-size 12px
    margin-left 5px
    color green
  .score-none
    display inline-block
    font-size 12px
    color green
  .star-item
      display: inline-block
      background-repeat: no-repeat
  &.star-24
    .star-item
      height: 10px
      width: 10px
      margin-right: 3px
      background-size: 10px 10px
      &:last-child
        margin-right: 0
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
  &.star-36
    .star-item
      height: 15px
      width: 15px
      margin-right: 6px
      background-size: 15px 15px
      &:last-child
        margin-right: 0
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
</style>