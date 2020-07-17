import {service} from '../../request/request.js'
import axios from 'axios'

const getSystems=function(){
    return service({
        method:'get',
        url:'/projectConfig/systems.config.json'
    })
    .then(data=>data)
}

const getMenu=function(filename){
    return service({
        method:'get',
        url:`/projectConfig/${filename}`
    })
    .then(data=>data)
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
    getImage
}