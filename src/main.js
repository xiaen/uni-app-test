import Vue from 'vue'
import App from './App'
import request from './untils/request'

Vue.use(request)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()