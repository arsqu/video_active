import Vue from 'vue'
import { Toast } from 'cube-ui'
import router from '@router'

function getType(v) {
  return Object.prototype.toString.call(v)
}

function encryKey(key) {
  return window.btoa(key)
}

function decryKey(key) {
  return window.atob(key)
}

// 未登录清空数据
function clearCache() {
  localStorage.removeItem("isApply")
  localStorage.removeItem(encryKey("uname"))
  localStorage.removeItem(encryKey("uid"))
  localStorage.removeItem(encryKey("token"))
}

function showToast(txt, type, time) {
  var opt = {},
    mask
  if (getType(txt) == "[object Object]") {
    opt = txt;
    ({ txt, time, type, mask } = opt)
  }
  time = typeof time == 'number' ? time : 2e3
  window.$cube_toast = Toast.$create({
    txt,
    type: type || "txt",
    time: time,
    mask
  }).show()
}

function hideToast() {
  window.$cube_toast && window.$cube_toast.hide()
}

function logout() {
  var uid = localStorage.getItem(encryKey("uid"))
  if (!uid) {
    clearCache()
    return
  }
  uid = decryKey(uid)
  uid = uid.split("&")[1]
  var token = localStorage.getItem(encryKey("token"))
  Vue.prototype.$axios
    .specPost(
      {
        url: "logout",
        key: "userId",
        v: uid
      },
      {},
      {
        headers: {
          Authorizations: decryKey(token)
        }
      }
    )
    .then((res) => {
      clearCache()
      setTimeout(_ => {
        router.go()
      }, 1000)
      console.log(res)
    })
}

export default {
  logout,
  clearCache,
  encryKey,
  decryKey,
  showToast,
  hideToast
}