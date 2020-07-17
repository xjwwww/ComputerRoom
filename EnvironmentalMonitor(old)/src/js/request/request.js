var axios=require('axios')
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/message.css'

function throttle(fn){
	let valid=true
	return function(args,delay){
		if(!valid)
			return
		valid=false
		setTimeout(()=>{
			console.log("timeout")
			fn(args)
			valid=true
		},delay)
	}
}

const popMessage=throttle((message)=>Message.error(message))

const service = axios.create({
    timeout: 6000
});

service.interceptors.response.use(
	response=>{
		if(response.data===false){
			Message.error('操作失败')
			return Promise.reject(false)
		}else if(response.data===true)
            Message({
                message: '操作成功',
                type: 'success'
			})
		else if(response.data.status){
			let code=response.data.status.split(" ")[0]
			switch(code){
				case "401":
					popMessage('用户未登录,5秒后自动跳转到登录页面',3000)
					setTimeout(()=>window.location.href="/login.html",8000)
					break
				case "402":
					popMessage(`软件试用期已过，${response.data.message}`,5000)
					break
				case "403":
					popMessage('您没有权限访问该资源',5000)
					break
				default:
					break
			}
			return Promise.resolve(null)
		}
		return Promise.resolve(response.data)
	},
	error=>{
		if(error.response===undefined)
            Message.error('网络异常，请重试')
		else if(error.response.status===404)
			Message.error('404')
		else if(error.response.status===500)
			Message.error('500')
		return Promise.reject(false)
	}
)

// module.exports = service;
export {service}