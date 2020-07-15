import {service} from '../../request/request.js'
import axios from 'axios'

import changeSystemQuery from './changeSystemQuery.js'

const getSystems=function(){
    return service({
        method:'get',
        url:'/projectConfig/systems.config.json'
    })
    .then(data=>data)
}

// 请求修改 all.menu.json 的数据  -->  需要开启本地服务器(node.js)
const getChangeMenu = function(obj){
    return service({
        method: 'get',
        url: 'http://localhost:3000/serverchange',
        params: obj
    })
    .then((data)=>{
        return data
    })
    
}


// 请求获取选择系统按钮的数据  -->  需要开启本地服务器(node.js)
const getSelectSysBtn = function(){
    return service({
        method: 'get',
        url: 'http://localhost:3000/server'
    })
    .then(data => {
        let temp = data.splice(data.length-1, 1);
        return temp;
    })
}


// 请求获取 all.menu.json 的数据  -->  需要开启本地服务器(node.js)
const getMenu=function(filename){
    // console.log(filename)

        return service({
            method:'get',
            url:'http://localhost:3000/server'
        })
        .then(data=>{
            // console.log(data)

            let temp = data.splice(0, 5)
            //console.log(temp)
         
            if(filename == 'all.menu.json'){
                return temp    
            }else{
                // 调用各个系统仅需要数据的方法
                let newData = changeSystemQuery.changeGetMenu(filename, temp)
                // console.log(newData)
                return newData   
            }
            


        })

}

const getImage=function(imgUrl){
    let url=`/projectConfigImg/${imgUrl}`
    return axios.get(url,{responseType: 'arraybuffer'}).then((data)=>
        'data:image/png;base64,' + btoa(new Uint8Array(data.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    )
}

export default{
    getSystems,
    getMenu,
    getChangeMenu,
    getSelectSysBtn,
    getImage
}