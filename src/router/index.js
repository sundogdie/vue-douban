import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import show from 'components/show/show'
import user from 'components/user/user'
import search from 'components/search/search'
import ranking from 'components/ranking/ranking'
import movie from 'components/movie/movie'
import rank_detail from 'components/rank-detail/rank_detail'
import cele from 'components/cele/cele'
import works from 'components/works/works'
import disucss from "components/discuss/discuss"
import reviewDetail from "components/review-detail/review-detail"

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:"/show"
    },
    {
      path:"/show",
      component:show
    },
    {
      path:"/ranking",
      component:ranking,
      children:[
        {
          path:":ranktype",
          component:rank_detail
        }
      ]
    },
    {
      path:"/user",
      component:user
    },
    {
      path:"/movie/:id",
      component:movie,
      children:[
        {
          path:":discussType",
          component:disucss
        },
        {
          path:"review/:reviewId",
          component:reviewDetail
        },
        {
          path: "*",
          redirect: "/"
        } 
      ]
    },
    {
      path:"/cele/:key",
      component:cele
    },
    {
      path:"/works/:name",
      component:works
    },
    {
      path:"/search",
      component:search
    },
    {
      path: "*",
      redirect: "/"
    }   
  ],linkActiveClass:'tab-active'
})
