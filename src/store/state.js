import {getData} from '../common/js/storage'
const state = {
  wantedMovies:getData("want"),//想看的电影
  actor: getData('actor'),//演员信息
  watchedMovies: getData("watch")//看过的电影
}
export default state