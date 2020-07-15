import {service} from '@/js/request/request.js'
import {Message} from 'element-ui'
import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/fission/findFissionAirManageAll',
    addDevice:'/software/fission/insertFissionAir',
    updateDevice:'/software/fission/updateFissionAir',
    deleteDevice:'/software/fission/deleteFissionAir/${id}',
    getIps:'/software/fission/findFissionDeviceIp',
}

const transformFormat={
    device:[
        ["deviceId","efmId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","efmAddress"],
        ["name","efmName"],
        ["status","efmStatus"],
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)
query.controlFission=function(deviceId,code){
    return service({
		method:'get',
		url:`/software/fission/fissionController/${deviceId}/${code}`
	})
	.then(
		({zt})=>{
			return{
				result:zt
			}
		}
	)
	.catch(()=>{
		Message.error("连接超时")
		return Promise.reject()
	})
}

export default query