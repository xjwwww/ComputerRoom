// const getDevices=()=>Promise.resolve({
//     cpuUsage:{
//         system:12.6,
//         user:9.4,
//         total:22,
//         error:0,
//         wait:0,
//         unuse:78
//     },
//     memoryUsage:{
//         total:4007.98,
//         inuse:3285.09,
//         unuse:722.8
//     },
//     swapUsage:{
//         total:14759.89,
//         inuse:7575.45,
//         unuse:7184.44
//     },
//     diskUsage:[
//         {name:"C盘",total:90,inuse:62.5,unuse:37.5},
//         {name:"D盘",total:133.34,inuse:58.3,unuse:41.7},
//         {name:"E盘",total:133.34,inuse:58.3,unuse:41.7},
//         {name:"F盘",total:90,inuse:62.5,unuse:37.5},
//     ]
// })

// export default {getDevices}


// import serverBaseQuery from '@/components/system/server/serverBaseQuery.js'

// import {service} from '@/js/request/request.js'
// import {dataTransform} from '@/js/util/util.js'



// const serverBaseQuery = class {
//     constructor(urls, transformFormat){
//         this.url = urls
//         this.transformFormat = transformFormat
//     }
//     getAllServerInfo(){
//         let that = this;
//         return service({
//             method: 'get',
//             url: that.url.getServerInfo
//         })
//         .then(data => data)
//     }
    
//     checkStatus(transform){
//         let that = this;
//         console.log(that.urls.getServerInfo)
//         return service({
//             method: 'get',
//             url: that.urls.getServerInfo
//         })
//         .then(
//             data=>{
//                 if(transform)
//                     return data.map(element=>transform(element))
//                 return data.map(element=>dataTransform(this.transformFormat.status,element))
//             }
//         )
//     }
// }
import BaseQuery from '@/js/query/base/BaseQuery'

const urls = {
    getDevices: 'software/sysMsgController/getSystemMessage',
    checkStatus: 'software/sysMsgController/getSystemMessage'
}

const transformFormat = {
    status: [
        ['computerMessage', 'computerMessage'],
        ['diskList', 'diskList']
    ]
    
}

let query = new BaseQuery(urls, transformFormat)

export default query