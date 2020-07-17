import {service} from '@/js/request/request.js'

const getRolesByName=function(name){
    return service({
		method:'get',
		url:`/software/loginGetRole/${name}`
	})
	.then(({roleName})=>roleName)
}

export default{
    getRolesByName
}