// import 'expose-loader?$!jquery'
// import 'expose-loader?jQuery!jquery'
// import 'bootstrap/dist/js/bootstrap.min.js'

import 'babel-polyfill'

import promise from 'es6-promise'
promise.polyfill()

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
import message from '../plugins/message'

// 挂载自定义message必须放在Vue.use(ElementUI)后面，才能覆盖element-ui默认的message，不然没有效果
Vue.use('ElementUI')
Vue.prototype.$message = message;

// store.state.test=11
/* eslint-disable */
var loginPage = new Vue({
    el: '#login-page',
    render: c => c(loginpage),
})