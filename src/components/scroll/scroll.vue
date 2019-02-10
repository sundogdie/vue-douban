<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  mounted() {
    setTimeout( () => {
      this._initScroll()
    },20)
  },
  props: {
    data: {
    },
    pullup: {
      type: Boolean,
      default: false
    },
    eventPassthrough: {
      type: String,
      default: ''
    },
    scrollX: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _initScroll() {
      if(!this.$refs.scroll) {
        return
      }
      this.scroll = new BScroll(this.$refs.scroll,{
        click: true,
        probeType: 1,
        scrollX:this.scrollX,
        eventPassthrough: this.eventPassthrough
      })
      if (this.pullup) {
        this.scroll.on('scrollEnd',()=>{
          if(this.scroll.y <= this.scroll.maxScrollY){
            this.$emit('scrolltoEnd')
          }
        })
      }
    },
    refresh() {
      this.scroll.refresh()
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.scroll.refresh()
      },20)
    }
  }
}

</script>
<style scoped lang='stylus'>
</style>