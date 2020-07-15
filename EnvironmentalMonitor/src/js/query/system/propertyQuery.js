import {service} from '../../request/request.js'
import {timeFormatTransform} from '../../util/util.js'

const getProperties=function(){
    return service({
        method: 'get',
        url: '/software/management/selectManagementDeviceAll',
    })
    .then(data=>
            data.map(element=>propertyDecomposition(element))
    )
}

const propertyDecomposition=function({emdId,emdName,address,number,gId,diId}){
    return {
        propertyId:emdId, //propertyId
        name:emdName,
        address,
        propertyNumber:number,
        groupId:gId,
        ipId:diId
    }
}

const propertyInDecomposition=function({deviceId,name,address,propertyNumber,groupId,ipId}){
    return {
        emdId:deviceId,
        emdName:name,
        address,
        number:propertyNumber,
        gId:groupId,
        diId:ipId
    }
}

const getIps=function(){
    return service({
        method:'get',
        url:'/software/management/findManagementDeviceIp'
    })
    .then(
        data=>
            data.map(({diId,diAddress,diPort})=>{return {id:diId,address:diAddress,port:diPort}})
    )
}

const addProperty=function(object){
    return service({
        method:'post',
        url:'/software/management/insertManagementDevice',
        data:propertyInDecomposition(object)
    })
}

const updateProperty=function(object){
    return service({
        method:'put',
        url:'/software/management/updateManagementDevice',
        data:propertyInDecomposition(object)
    })
}

const deleteProperty=function(id){
    return service({
        method:'delete',
        url:`/software/management/deleteManagementDevice/${id}`,
    })
}

const getDevices=function(){
    return service({
        method:'get',
        url:'/software/management/selectManagementManageAll'
    })
    .then(data=>
        data.map(element=>deviceDecomposition(element))
    )
}

const checkStatus=function(){
    return service({
        method:'get',
        url:'/software/management/selectManagementManageStatus'
    })
    .then(data=> 
            data.map(({mId,status})=>{
                return {
                    id:mId,
                    status
                }
            })
    )
}

const deviceDecomposition=function({name,status,gallery,mId,emdId}){
    return{
        deviceId:mId,
        name,
        channel:gallery,
        status,
        propertyId:emdId
    }
}

const deviceInDecomposition=function({deviceId,name,status,channel,propertyId}){
    return{
        mId:deviceId,
        name,
        gallery:channel,
        status,
        emdId:propertyId
    }
}

const addDevice=function(object){
    return service({
        method:'post',
        url:'/software/management/insertManagementManage',
        data:deviceInDecomposition(object)
    })
}

const updateDevice=function(object){
    return service({
        method:'put',
        url:'/software/management/updateManagementManage',
        data:deviceInDecomposition(object)
    })
}

const deleteDevice=function(id){
    return service({
        method:'delete',
        url:`/software/management/deleteManagementManage/${id}`,
    })
}

const changeDeviceColor=function(id,color){
    return service({
        method:'get',
        url:`/software/management/ChangeManagementColor/${id}/${color}`,
    })
}

const getAlarms=function(deviceId,startTime,endTime){
    startTime=timeFormatTransform(startTime)
    endTime=timeFormatTransform(endTime)
    return service({
        method:'get',
        url:`/software/management/findManagementAlarm/${deviceId}/${startTime}/${endTime}`
    })
    .then(
        data=>data.map(element=>alarmDecomposition(element))
    )
}

function alarmDecomposition({emaId,emaTime}){
    return{
        id:emaId,
        name:'',
        description:'',
        time:emaTime
    }
}

export default {
    getProperties,
    getIps,
    addProperty,
    updateProperty,
    deleteProperty,
    getDevices,
    addDevice,
    updateDevice,
    deleteDevice,
    checkStatus,
    changeDeviceColor,
    getAlarms
}