import axios from 'axios'
export function getHotmovie(start,count,url){
  const data=Object.assign({},
    {"apikey":'0b2bdeda43b5688921839c8ecb20399b'},
    {"start":start,"count":count}
  );
  return axios.get(url,{
    params:data
  }).then(res=>{
    return Promise.resolve(res.data)
  }).catch(()=>{
    console.error('get error')
  })
}
export function getMovieDetail(id,urls){
  const url=urls+id;
  const data=Object.assign({},
    {"apikey":'0b2bdeda43b5688921839c8ecb20399b'},
  );
  return axios.get(url,{
    params:data
  }).then(res=>{
    return Promise.resolve(res.data)
  }).catch(()=>{
    console.error('get error')
  })
}
export function getCelebrity(id) {
  const url = `/v2/movie/celebrity/${id}`;
  const data = Object.assign({},{"apikey":'0b2bdeda43b5688921839c8ecb20399b'},);
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

export function getCelebrityWorks(id,start,count) {
  const url = `/v2/movie/celebrity/${id}/works`;
  const data = Object.assign({},{"apikey":'0b2bdeda43b5688921839c8ecb20399b'},{start,count});
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  });
}
export function movieSearch(query, start, count) { // top250
  const url = '/v2/movie/search';
  const data = Object.assign({},{"apikey":'0b2bdeda43b5688921839c8ecb20399b'}, {
    q: query,
    start,
    count
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

export function tagSearch(tag, start, count) { // top250
  const url = '/v2/movie/search';
  const data = Object.assign({},{"apikey":'0b2bdeda43b5688921839c8ecb20399b'}, {
    tag,
    start,
    count
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  });
}
