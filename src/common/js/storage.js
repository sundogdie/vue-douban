function storage(item) {
  let storage = window.localStorage.getItem(item)
  if(storage === null) {
    return []
  }else {
    return JSON.parse(storage)
  }
}
function addData(arr,params,fn) {
  const index = arr.findIndex(fn)
  if(index > 0) {
    return
  }else if(index < 0) {
    arr.unshift(params)
  }
}
function removeData(arr,fn) {
  const index = arr.findIndex(fn)
  if(index > -1) {
    arr.splice(index,1)
  }
}
export function addWatched(val,name) {
  let items = storage(name)
  addData(items,val,(item) => {
    return item.id === val.id
  })
  window.localStorage.setItem(name,JSON.stringify(items))
  return items
}
export function removeWatched(val,name) {
  let items = storage(name)
  removeData(items,(item) => {
    return item.id === val.id
  })
  window.localStorage.setItem(name,JSON.stringify(items))
  return items
}
export function getData (data) {
  return storage(data)
}
//读取localstorage函数