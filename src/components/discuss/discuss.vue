<template>
  <div class="discussion-wrapper">
    <div class="fixed-title">
    <span class="back" @click="back">
      <i class="icon-back"></i>
    </span>
      <span class="type">{{title}}</span>
      <span class="to-top" @click="totop">
      <i class="icon-circle-up"></i>
    </span>
    </div>
    <div class="all-discuss" ref="top">
      <scroll class="discuss-content" @scrolltoEnd="getData" :pullup="true" :data="discussions">
        <comment :movie_comment="discussions" v-if="type==='comments'">
        </comment>
        <review :movie_review="discussions" @selectReview="selectReview" v-else>
        </review>
      </scroll>
    </div>
  </div>    
</template>

<script>
import comment from 'components/movie-comment/comment'
import review from 'components/movie-review/review'
import scroll from 'components/scroll/scroll'
import { getHotmovie } from '../../common/js/getmovielist'
const SEARCH_MORE = 20;
export default {
  computed:{
    title(){
      return this.name+'的全部'+this.typename
    },
  },
  components:{
    review,
    comment,
    scroll
  },
  data(){
    return{
      dataFn:null,
      type:null,
      typename:'',
      name:'',
      discussionsindex:0,
      discussions:[]
    }
  },
  methods:{
    back(){
      this.$emit('show',true);
      this.$router.go(-1)
    },
    totop(){
      this.$refs.top.scrollTo(0,0,500)
    },
    selectReview(id){
      const topId=this.$route.params.id;
      this.$router.push({
          path:`/movie/${topId}/review/${id}`
      })
    },
    isType(){
       this.type=this.$route.params.discussType;
      const id=this.$route.params.id;
      if(this.type==='reviews'){
        this.typename='影评';
        this.dataFn=`/v2/movie/subject/${id}/reviews`
      }else{
        this.typename='短评';
        this.dataFn=`/v2/movie/subject/${id}/comments`
      }
    },
    getData(){
      getHotmovie(this.discussionsindex,SEARCH_MORE,this.dataFn).then(res=>{
        if(this.discussions.length===0){
          this.name=res.subject.title;
        };
        this.discussions=this.discussions.concat(res[this.type])
      });
      this.discussionsindex+=SEARCH_MORE;
    }
  },
  created(){
    this.$emit('show',false)
    this.isType();
    this.getData()
  },
}

</script>
<style scoped lang="stylus">
  .discussion-wrapper
    height: 100%
    .fixed-title
      border-bottom 1px solid #777
      position: fixed
      top: 0
      width: 100%
      height: 50px
      z-index: 999
      background-color: white
      .back
        position: absolute
        top: 0px
        left: 6px
        z-index: 50
        .icon-back
          display: block
          padding: 15px
          font-size: 16px
          color: #42bd56
      .type
        line-height: 50px
        font-size: 14px
        padding-left: 50px
      .to-top
        position: absolute
        top: 0
        right: 6px
        z-index: 50
        .icon-circle-up
          display: block
          padding: 15px
          font-size: 22px
          color: #42bd56
    .all-discuss
      position: fixed
      top 0
      bottom: 0
      left: 0
      right: 0
      z-index: 995
      overflow: hidden
      background-color: white
      .discuss-content
        padding: 0 20px 0 20px
        overflow hidden
        height 100%
      .load
        padding-bottom 20px
        text-align: center
        color #777
</style>