import axios from 'axios';
import store from '../store';
import vue from 'vue';
// import router from '../router';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000,                  // 请求超时时间
    withCredentials: true
});

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => 
  {
    return response;
  },
  error => 
  {
    if (error.response.status == 417) 
    {
       store.commit('SET_TOKEN', '');
    }    
    return Promise.reject(error);
  }
)

export default service;
