import {addWatched,removeWatched} from '../common/js/storage'
export const addWatchMovies = function ({commit},movie) {
  commit('SET_WATCHED_MOVIES',addWatched(movie,"watch"))
}
export const removeWatchMovies = function ({commit},movie) {
  commit('SET_WATCHED_MOVIES',removeWatched(movie,"watch"))
}
export const addWantMovies = function ({commit},movie) {
  commit('SET_WANTED_MOVIES',addWatched(movie,"want"))
}
export const removeWantMovies = function ({commit},movie) {
  commit('SET_WANTED_MOVIES',removeWatched(movie,"want"))
}
export const addActor = function ({commit},movie) {
  commit('SET_ACTOR',addWatched(movie,"actor"))
}
export const removeActor = function ({commit},movie) {
  commit('SET_ACTOR',removeWatched(movie,"actor"))
}
