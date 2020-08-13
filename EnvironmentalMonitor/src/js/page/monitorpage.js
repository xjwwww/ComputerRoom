// import 'expose-loader?$!jquery'
// import 'expose-loader?jQuery!jquery'
// import 'bootstrap/dist/js/bootstrap.min.js'

import 'babel-polyfill'

import promise from 'es6-promise'
promise.polyfill()

import 'bootstrap/dist/css/bootstrap.min.css'

// import 'babel-polyfill'

import Vue from 'vue'


// import VueRouter from 'vue-router'
// Vue.use(VueRouter)

import store from '../store'

// import permissionDirective from '@/directive/permission/index.js'
// Vue.use(permissionDirective)

import '../plugins/element-ui.config.js'

import router from '../router'
import monitorpage from '../../monitorpage.vue'

// 全局注册常用组件
import BaseDeviceExhibition from '@/components/base/tab/baseDeviceExhibition/BaseDeviceExhibition.vue'
import BaseLargeDeviceExhibition from '@/components/base/tab/baseLargeDeviceExhibition/BaseLargeDeviceExhibition.vue'
import BaseMiddleDeviceExhibition from '@/components/base/tab/baseMiddleDeviceExhibition/BaseMiddleDeviceExhibition.vue'
import BaseAlarmInquiry from '@/components/base/tab/baseAlarmInquiry/BaseAlarmInquiry.vue'
import BaseHistoryInquiry from '@/components/base/tab/baseHistoryInquiry/BaseHistoryInquiry.vue'

import BaseGroupSidetree from '@/components/base/element/baseGroupSidetree/BaseGroupSidetree.vue'
import BaseTablePagination from '@/components/base/element/baseTablePagination/BaseTablePagination.vue'
import BaseManageTableOperation from '@/components/base/element/baseManageTableOperation/BaseManageTableOperation.vue'
import message from '../plugins/message'

// 挂载自定义message必须放在Vue.use(ElementUI)后面，才能覆盖element-ui默认的message，不然没有效果
Vue.use('ElementUI')
Vue.prototype.$message = message;
Vue.component('base-device-exhibition', BaseDeviceExhibition)
Vue.component('base-large-device-exhibition', BaseLargeDeviceExhibition)
Vue.component('base-middle-device-exhibition', BaseMiddleDeviceExhibition)
Vue.component('base-alarm-inquiry', BaseAlarmInquiry)
Vue.component('base-history-inquiry', BaseHistoryInquiry)

Vue.component('base-management-table-operation', BaseManageTableOperation)
Vue.component('base-group-sidetree', BaseGroupSidetree)
Vue.component('base-table-pagination', BaseTablePagination)

import permissionMixin from '@/js/mixin/permission.js'

// Vue.mixin() 可以把你创建的自定义方法混入所有的 Vue 实例
Vue.mixin(permissionMixin)

// import projectQuery from '../query/store/projectQuery.js'


router.beforeEach(async(to, from, next) => {
    if (to.path != "/login.html") {
        if (sessionStorage.token) {

            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                if (!store.getters.name)
                    await store.dispatch('role/updateName')
                if (!store.getters.roles)
                    await store.dispatch('role/updateRole', store.getters.name)
            }
            next()
        } else {
            // next('/login.html')
            window.location.href = "/login.html?fromPath=" + to.fullPath
        }
    } else {

        next()

    }
})


/* eslint-disable */
var mainPage = new Vue({
    el: '#main-page',
    store,
    router,
    render: c => c(monitorpage),

})