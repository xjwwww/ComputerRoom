import {service} from '@/js/request/request.js'
import {dataTransform} from '@/js/util/util.js'
import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
	getDevices:'/software/electricmeter/findElectricmeterAll',
	getDevicesDatas:'/software/electricmeter/findElectricmeterDataAll',
    checkStatus:'/software/electricmeter/findElectricmeterDataAll',
    addDevice:'/software/electricmeter/insertElectricmeterManage',
    updateDevice:'/software/electricmeter/updateElectricmeterManage',
    deleteDevice:'/software/electricmeter/deleteElectricmeterManage/${id}',
    getIps:'/software/electricmeter/findElectricmeterDeviceIp',
    getAlarms:'/software/electricmeter/findElectricmeterAlarmAll/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/electricmeter/electricmeterAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/electricmeter/findElectricmeterHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/electricmeter/electricmeterHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
	device:[
        ["deviceId","pemId"],
		["address","pemAddress"],
		["name","pemName"],
		["pemMaxAvol","pemMaxAvol"],
		["pemMinAvol","pemMinAvol"],
		["pemMaxBvol","pemMaxBvol"],
		["pemMinBvol","pemMinBvol"],
		["pemMaxCvol","pemMaxCvol"],
		["pemMinCvol","pemMinCvol"],
		["pemMaxAcur","pemMaxAcur"],
		["pemMinAcur","pemMinAcur"],
		["pemMaxBcur","pemMaxBcur"],
		["pemMinBcur","pemMinBcur"],
		["pemMaxCcur","pemMaxCcur"],
		["pemMinCcur","pemMinCcur"],
		["pemMaxABvol","pemMaxABvol"],
		["pemMinABvol","pemMinABvol"],
		["pemMaxBCvol","pemMaxBCvol"],
		["pemMinBCvol","pemMinBCvol"],
		["pemMaxCAvol","pemMaxCAvol"],
		["pemMinCAvol","pemMinCAvol"],
		["pemMaxApap","pemMaxApap"], //有功功率
		["pemMinApap","pemMinApap"],
		["pemMaxBpap","pemMaxBpap"],
		["pemMinBpap","pemMinBpap"],
		["pemMaxCpap","pemMaxCpap"],
		["pemMinCpap","pemMinCpap"],
		["pemMaxAprp","pemMaxAprp"], //无功功率
		["pemMinAprp","pemMinAprp"],
		["pemMaxBprp","pemMaxBprp"],
		["pemMinBprp","pemMinBprp"],
		["pemMaxCprp","pemMaxCprp"],
		["pemMinCprp","pemMinCprp"],
		["pemMaxAppf","pemMaxAppf"], //功率因素
		["pemMinAppf","pemMinAppf"],
		["pemMaxBppf","pemMaxBppf"],
		["pemMinBppf","pemMinBppf"],
		["pemMaxCppf","pemMaxCppf"],
		["pemMinCppf","pemMinCppf"],
		["pemMaxTpap","pemMaxTpap"],
		["pemMinTpap","pemMinTpap"],
		["pemMaxTprp","pemMaxTprp"],
		["pemMinTprp","pemMinTprp"],
		["pemMaxTppf","pemMaxTppf"],
		["pemMinTppf","pemMinTppf"],
		["timeInterval","intervalTime"],
		["ipId","diId"],
		["groupId","gId"],
	],
	alarm:[
        ["id","peaId"],
        ["deviceName","pemName"],
        ["description","peaInfo"],
        ["time","peaTime"]
	],
	ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ],
    history:[
        ["id","pehId"],
        ["AVoltage","pehAvol"],
        ["BVoltage","pehBvol"],
        ["CVoltage","pehCvol"],
        ["ACurrent","pehAcur"],
        ["BCurrent","pehBcur"],
        ["CCurrent","pehCcur"],
        ["totalPower","pehTpap"],
        ["electricQuantity","pehElequantity"],
        ["electricCharge","pehElecharge"],
        ["usedTime","pehUserdTime"],
        ["time","pehTime"]
    ]
}

const query=new BaseQuery(urls,transformFormat)

query.getDevices=function(){
	return Promise.all([
		service({
			method: 'get',
			url: urls.getDevices,
		}),
		service({
			method: 'get',
			url: urls.getDevicesDatas,
		})
	])
    .then(
        result=>{
			let devices=[]
			let deviceSettings=result[0]
			let deviceDatas=result[1]
			for(let i=0,len1=deviceSettings.length;i<len1;i++){
				for(let j=0,len2=deviceDatas.length;j<len2;j++){
					if(deviceSettings[i].pemId===deviceDatas[j].pemId){
						let device = {...dataTransform(transformFormat.device,deviceSettings[i]),...deviceDataDecomposition(deviceDatas[j])}
						devices.push(device)
						break
					}
				}
			}
			return devices
		}
    )
}

query.checkStatus=function(){
    return query.__proto__.checkStatus.call(this,deviceDataDecomposition)
}

// const deviceSettingDecomposition=function(data){
// 	return{
// 		deviceId:data.pemId,
// 		address:data.pemAddress,
// 		name:data.pemName,
// 		phaseASetting:{
// 			maxVol:data.pemMaxAvol,
// 			minVol:data.
// 		}
// 	}
// }

const deviceDataDecomposition=function(data){
	return{
		deviceId:data.pemId,

        phaseAData:{
            current:data.pedAcur,
            voltage:data.pedAvol,
            activePower:data.pedApap,
            reactivePower:data.pedAprp,
            powerFactor:data.pedAppf
        },

        phaseBData:{
            current:data.pedBcur,
            voltage:data.pedBvol,
            activePower:data.pedBpap,
            reactivePower:data.pedBprp,
            powerFactor:data.pedBppf
        },

        phaseCData:{
            current:data.pedCcur,
            voltage:data.pedCvol,
            activePower:data.pedCpap,
            reactivePower:data.pedCprp,
            powerFactor:data.pedCppf
        },

        linePowerData:{
            lineABvoltage:data.pedABvol,
            lineBCvoltage:data.pedBCvol,
            lineCAvoltage:data.pedCAvol,
            totalPowerFactor:data.pedTppf,
            totalReactivePower:data.pedTprp,
            totalActivePower:data.pedTpap
        }
	}
}

export default query