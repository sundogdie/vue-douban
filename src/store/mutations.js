const mutations = {
  SET_WATCHED_MOVIES(state,movie) {
    state.watchedMovies = movie
  },
  SET_WANTED_MOVIES(state,movie) {
    state.wantedMovies = movie
  },
  SET_ACTOR(state,id) {
    state.actor = id
  }
}
export default mutations