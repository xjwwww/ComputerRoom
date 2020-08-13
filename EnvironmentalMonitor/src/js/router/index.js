import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Homepage from '@/components/home/Homepage.vue'
import Alarm from '@/components/alarm/Alarm.vue'
import Systems from '@/components/systems/Systems.vue'
import operateNav from '@/components/operateNav/operateNav.vue'

// import dealHideObj from '@/components/dealHideObj.js'

// const router=new VueRouter({
//     routes:[
//         {path:'/', meta:{requireAuth:true},redirect:'/homepage'},
//         {path:'/homepage',name:'homepage',meta:{ requireAuth:true},component:Homepage},
//         {path:'/alarm',meta:{ requireAuth:true},component:Alarm},
//         {path:'/systems',name:'systems',meta:{ requireAuth:true},component:Systems}
//     ],
// })

export const constantRoutes = [
    { path: '/', meta: { requireAuth: true }, redirect: '/homepage' },
    { path: '/homepage', name: 'homepage', meta: { requireAuth: true }, component: Homepage },
    { path: '/alarm', meta: { requireAuth: true }, component: Alarm },
    { path: '/systems', name: 'systems', meta: { requireAuth: true }, component: Systems },
    { path: '/operateNav', name: 'operateNav', meta: { requireAuth: true }, component: operateNav }
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