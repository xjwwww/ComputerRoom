import {service} from '@/js/request/request.js'

const getDevices=function(){
    return service({
        method: 'get',
        url: '/software/deviceIp/findDeviceIpAll',
    })
    .then(data=>
            data.map(element=>deviceDecomposition(element))
    )
}

const deviceDecomposition=function({dId,diId,diAddress,diPort,diIsConnect,gId}){
    return {
        deviceTypeId:dId,
        deviceId:diId,
        // name:name,
        ipAddress:diAddress,
        ipPort:diPort,
        isConnect:diIsConnect,
        groupId:gId
    }
}

const updateIpConnect=function(deviceId,isConnect){
    isConnect=isConnect?1:0
    return service({
        method:'put',
        url:`/software/deviceIp/upadateIpConnect/${deviceId}/${isConnect}`
    })
}

const addDevice=function(object){
    object=deviceInDecomposition(object)
    return service({
        method:'post',
        url:'/software/deviceIp/insertDeviceIpAll',
        data:object
    })
}

const updateDevice=function(object){
    object=deviceInDecomposition(object)
    return service({
        method:'put',
        url:'/software/deviceIp/updateDeviceIpById',
        data:object
    })
}

const deviceInDecomposition=function({deviceId,deviceTypeId,ipAddress,ipPort,groupId}){
    return{
        diId:deviceId,
        dId:deviceTypeId,
        diAddress:ipAddress,
        diPort:ipPort,
        gId:groupId
    }
}

const deleteDevice=function(id){
    return service({
        method:'delete',
        url:`/software/deviceIp/deleteDeviceIpById/${id}`,
    })
}

const getDeviceType=function(){
    return service({
        method: 'get',
        url: '/software/deviceIp/findDeviceAll',
    })
    .then(
        data=>{
            let dataList=data.map(element=>deviceTypeDecomposition(element))
            let dataMap={}
            dataList.forEach(element=>{
                dataMap[element.id]=element
            })
            return dataMap
        }
    )
}

const deviceTypeDecomposition=function({dId,name}){
    return {
        id:dId,
        name
    }
}

export default {
    getDevices,
    updateIpConnect,
    updateDevice,
    deleteDevice,
    addDevice,
    getDeviceType
}