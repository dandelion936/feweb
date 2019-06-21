// 引入 axios
import axios from 'axios';
import config from '../config/config'
import qs from 'qs'
import Cookies from 'js-cookie'
// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = config.development;
} else {
  axios.defaults.baseURL = config.production;
}

// 超时时间
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
// 响应拦截
axios.interceptors.response.use(
  response => {
    console.log(response.status)
    if(response.data.authCode == -99999) {
      Cookies.remove('token')
      window.location.reload()
    }
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          // router.replace({
          //   path: '/login',
          //   query: {
          //     redirect: router.currentRoute.fullPath
          //   }
          // });
          break;
        case 404:
          // Toast({
          //   message: '网络请求不存在',
          //   duration: 1500,
          //   forbidClick: true
          // });
          break;
        default:
          // Toast({
          //   message: error.response.data.message,
          //   duration: 1500,
          //   forbidClick: true
          // });
      }
      return Promise.reject(error.response);
    }
  }
);

export function get(url:string, param?:any) {
  let params:any = {}
  if(Cookies.get('token')) {
    params.token = Cookies.get('token')
  }
  Object.assign(params,param)
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export function post(url:string, param:any) {
  let params:any = {}
  if(Cookies.get('token')) {
    params.token = Cookies.get('token')
  }
  Object.assign(params,param)
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
