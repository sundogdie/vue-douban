<template>
  <div class="cele-list">
    <div class="cele-item" @click="goToPath(item.id)" v-for="(item,index) in cele" :key="index">
      <div class="cele-img"><img width="70px" height="100px" :src="getImages(item.image)"></div>
      <div class="cele-text">
        <h2 class="name">{{item.name}}</h2>
        <p class="work">{{item.works}}</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    cele: {
      type: Array
    }
  },
  methods: {
    getImages( _url ){
      if( _url !== undefined ){
        let _u = _url.substring( 7 );
        return 'https://images.weserv.nl/?url=' + _u;
      }
    },
    goToPath(id) {
      this.$router.push({
        path:`/cele/${id}`
      })
    }
  }
}

</script>
<style scoped lang='stylus'>
.cele-list
  height 100%
  padding-top 30px
  background-color #fff
  .cele-item
    display flex
    padding 0 10px
    height 130px
    box-sizing border-box
    .cele-img
      flex 70px 0 0
      margin-right 10px
    .cele-text
      flex 1
      .name
        color #333
        font-size 16px
        line-height 50px
      .work
        color #777
        font-size 12px  
</style>