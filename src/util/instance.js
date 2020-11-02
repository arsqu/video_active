
import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  timeout: 0 * 1000 // 不设置超时时间
});

//请求拦截
instance.interceptors.request.use(request => {
  return request;
}, err => {
  return Promise.reject(err);
});

//响应拦截
instance.interceptors.response.use(response => {
  return response;
}, err => {
  return Promise.reject(err);
});

export default instance