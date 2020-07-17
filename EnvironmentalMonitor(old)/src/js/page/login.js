// import 'expose-loader?$!jquery'
// import 'expose-loader?jQuery!jquery'
// import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
// import store from '../store'

import Vue from 'vue'

import {
  Checkbox,
  Message,
} from 'element-ui'
Vue.use(Checkbox)
Vue.prototype.$message = Message
import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/checkbox.css'
import 'element-ui/lib/theme-chalk/message.css'

import loginpage from '../../login.vue'

// store.state.test=11
/* eslint-disable */
var loginPage=new Vue({
    el:'#login-page',
    render:c=>c(loginpage),
})