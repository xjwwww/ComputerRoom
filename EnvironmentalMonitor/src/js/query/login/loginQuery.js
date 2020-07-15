import {service} from '../../request/request.js'
import qs from 'qs'

const login=function(username,password){
    //console.log(username, password)
    return service({
        method: 'post',
        url: '/software/login',
        data:qs.stringify({username, password})
    })
    .then(
        (res)=>{
            console.log(res)
            return res.zt
        }
        
    ).catch((error)=>console.log(error))
}

export default{
    login
}