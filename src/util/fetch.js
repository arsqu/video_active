import $axios from './instance'
// import StatusCode from '@util/statusCode'
import i18n from '@locales'
import util from '@util/util'

// 响应状态码
function statusCode(code) {
  if (code !== 200 && code) {
    util.hideToast()
    util.showToast(i18n.t(`statusCode.${code}`), 'error')
    // StatusCode[code] && util.showToast(StatusCode[code], 'error')
  }
}

// 错误提示
function errCode(err) {
  console.log('错误提示', err)
  console.dir(err)
  if (err.message) {
    util.showToast(err.message, 'error')
  } else {
    util.showToast(err.response.status, 'error')
  }
}

// get
function getData(url, params) {
  return new Promise((resolve, reject) => {
    $axios.get(url, { params }).then(response => {
      statusCode(response.data.code)
      resolve(response.data)
    }).catch(err => {
      errCode(err)
      reject(err)
    })
  })
}

// post
function postData(url, data, config) {
  config = config || {}
  config.headers = config.headers || {
    'Content-Type': 'application/json'
  }
  return new Promise((resolve, reject) => {
    $axios.post(url, data, config).then(response => {
      statusCode(response.data.code)
      resolve(response.data, response)
    }).catch(err => {
      errCode(err)
      reject(err)
    })
  })
}

export default {
  getData,
  postData
}
