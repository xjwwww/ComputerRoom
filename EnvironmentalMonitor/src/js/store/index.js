// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)

// import alarmQuery from '../query/alarm/totalAlarmQuery.js'
// import groupQuery from '../query/store/groupQuery.js'
// import projectQuery from '../query/store/systemQuery.js/index.js'

// var store=new Vuex.Store({
//     state:{
//         groups:[],
//         unReadAlarmNumber:'待刷新',
//         readAlarmNumber:'待刷新',
//         systems:undefined,
//         menu:[],
//         selectedSystem:undefined,
//         roles:['user']
//     },
//     getters:{
//         hasPermission:(state)=>(value)=>{
//             const roles=state.roles
//             return roles.some(role=>{
//                 return value.includes(role)
//             })
//         }
//     },
//     mutations:{
//         refreshGroups(state,data){
//             if(!data)
//                 state.groups=[]
//             else
//                 state.groups[0]=data
//         },
//         refreshUnReadAlarmNumber(state,[data1,data2]){
//             state.unReadAlarmNumber=data1
//             state.readAlarmNumber=data2
//         },
//         updateMenu(state,data){
//             state.menu=data
//         },
//         updateSystems(state,data){
//             state.systems=data
//         },
//         updateSelectedsystem(state,data){
//             state.selectedSystem=data
//         }
//     },
//     actions:{
//         group/updateGroups(context,enforce=false){
//             if(enforce||context.state.groups.length===0){
//                 return groupQuery.getGroups()
//                 .then(
//                     groups=>context.commit('refreshGroups',groups)
//                 )
//                 .catch(
//                     ()=>context.commit('refreshGroups',null)
//                 )
//             }
//         },
//         queryReadAlarm(context,enforce=false){
//             if(enforce||(context.state.unReadAlarmNumber==='待刷新'&&context.state.readAlarmNumber==='待刷新')){
//                 return Promise.all([alarmQuery.queryAlarmNumber(0),alarmQuery.queryAlarmNumber(1)])
//                 .then(result=> {
//                         context.commit('refreshUnReadAlarmNumber',result)
//                     }
//                 )
//             }
//         },
//         queryMenu({commit,state}){
//             let filename=state.selectedSystem.filename
//             return projectQuery.getMenu(filename)
//             .then(menu=>
//                 commit('updateMenu',menu)
//             )
//         },
//         querySystems({commit}){
//             return projectQuery.getSystems()
//             .then(systems=>{
//                 systems=systems.filter(system=>system.visible===1)
//                 commit('updateSystems',systems)
//                 if(systems.length===1)
//                     commit('updateSelectedsystem',systems[0])
//             })
//         }
//     },
// })

// export default store

import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

/* 
  store中需要引入很多modules/*.js , 可以使用require.context
  require.context( 【要搜索的目录】, 【是否搜索其子目录】, 【匹配文件的正则表达式, 如: /\.js$/】)
  创建出一个 context, 其中文件来自 【要搜索的目录】 , 以 【匹配文件的正则表达式, 如: /\.js$/】 结尾
*/
const modulesFiles = require.context('./modules', true, /\.js$/)

/* 如果module分的过多，我们就需要在store的index.js中一个个引入，
  这样未免太麻烦，所以webpack出来了个配置
*/
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})
  
  const store = new Vuex.Store({
    getters,
    modules
  })
  
  export default store