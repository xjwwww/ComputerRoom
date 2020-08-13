// import 'expose-loader?$!jquery'
// import 'expose-loader?jQuery!jquery'
// import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

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

Vue.component('base-device-exhibition', BaseDeviceExhibition)
Vue.component('base-large-device-exhibition', BaseLargeDeviceExhibition)
Vue.component('base-middle-device-exhibition', BaseMiddleDeviceExhibition)
Vue.component('base-alarm-inquiry', BaseAlarmInquiry)
Vue.component('base-history-inquiry', BaseHistoryInquiry)

Vue.component('base-management-table-operation', BaseManageTableOperation)
Vue.component('base-group-sidetree', BaseGroupSidetree)
Vue.component('base-table-pagination', BaseTablePagination)


//vue混入
import permissionMixin from '@/js/mixin/permission.js'
Vue.mixin(permissionMixin)
    // import projectQuery from '../query/store/projectQuery.js'

//全局的路由守卫   
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