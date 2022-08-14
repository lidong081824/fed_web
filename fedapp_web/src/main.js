// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import App from './App'
import router from './router'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
// import 'amfe-flexible'
// import 'lib-flexible'
// import 'px2rem'
Vue.config.productionTip = false

Vue.use(ElementUI)

// 配置请求默认前缀
// axios.defaults.baseURL = 'http://localhost:80/service/'

// 添加请求拦截器,将请求参数转换成formdate类型
axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
  // eslint-disable-next-line no-unreachable
  Vue.http.opstions.emulateJSON = true
  Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

// 把axios变量绑定到Vue对象的原型链上
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
