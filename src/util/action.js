import fetch from './fetch'
import { crossUrl } from './api' // 请求接口
// import qs from 'qs'

const publicUrl = process.env.VUE_APP_PUBLIC_PATH
const baseUrl = process.env.VUE_APP_API_URL

console.log(process.env)

function getDeep(o, key, defaultValue) {
  return (
    /* eslint-disable */
    (!Object.prototype.toString.call(key) !== '[object Array]'
      ? key.replace(/\[/g, '.').replace(/\]/g, '').split('.')
      : key
    )
      /* eslint-enable */
      .reduce((o, k) => (o || {})[k], o) || defaultValue
  )
}

function getData(key, param, config) {
  var url = publicUrl + baseUrl + getDeep(crossUrl, key)
  return fetch.getData(url, param, config)
}

function postData(key, param, config) {
  var url = publicUrl + baseUrl + getDeep(crossUrl, key)
  return fetch.postData(url, param, config)
}

// 上传文件
function postFile(key, param, config) {
  var url = publicUrl + baseUrl + getDeep(crossUrl, key)
  return fetch.postData(url, param, config)
}

function specPost(opt, param, config) {
  var url = opt.url,
    key = opt.key,
    v = opt.v
  url = publicUrl + baseUrl + getDeep(crossUrl, url)
  param = param || {}
  url = url.replace(new RegExp('\\$\\{' + key + '\\}'), v)
  return fetch.postData(url, param, config)
}

export default {
  specPost,
  getData,
  postFile,
  postData
}
