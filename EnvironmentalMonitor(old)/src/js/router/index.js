import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Homepage from '@/components/home/Homepage.vue'
import Alarm from '@/components/alarm/Alarm.vue'
import Systems from '@/components/systems/Systems.vue'
import SkyLight from '@/components/skylight/GateMagnetism.vue'
import CoolingFan from '@/components/coolingFan/CoolingFan.vue'

// const router=new VueRouter({
//     routes:[
//         {path:'/', meta:{requireAuth:true},redirect:'/homepage'},
//         {path:'/homepage',name:'homepage',meta:{ requireAuth:true},component:Homepage},
//         {path:'/alarm',meta:{ requireAuth:true},component:Alarm},
//         {path:'/systems',name:'systems',meta:{ requireAuth:true},component:Systems}
//     ],
// })

//解决ElementUI导航栏中的vue-router在3.0版本以上重复点击跳转列表报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [
    { path: '/', meta: { requireAuth: true }, redirect: '/homepage' },
    { path: '/homepage', name: 'homepage', meta: { requireAuth: true }, component: Homepage },
    //告警讯息
    { path: '/alarm', meta: { requireAuth: true }, component: Alarm },
    { path: '/systems', name: 'systems', meta: { requireAuth: true }, component: Systems },
    //天窗消防
    { path: '/skylight', name: 'skylight', meta: { requireAuth: true }, component: SkyLight },
    //散日风扇
    { path: '/coolingFan', name: 'coolingFan', meta: { requireAuth: true }, component: CoolingFan }
]

const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router