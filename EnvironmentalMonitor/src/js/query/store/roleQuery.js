import {service} from '@/js/request/request.js'

const getRolesByName=function(name){
	// console.log(name)
    return service({
		method:'get',
		url:`/software/loginGetRole/${name}`
	})
	.then(({roleName})=>{
		// console.log(roleName)
		return roleName
	})
}

export default{
    getRolesByName
}