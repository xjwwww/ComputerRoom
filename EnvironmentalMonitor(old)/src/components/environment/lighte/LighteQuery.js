import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/lightController/getLightManageAll',
    checkStatus:'/software/lightController/findLightManageStatus',
    addDevice:'/software/lightController/insertLightManage',
    updateDevice:'/software/lightController/updateLightManage',
    deleteDevice:'/software/lightController/deleteLightManage/${id}',
    getIps:'/software/lightController/findLightDeviceIp',
    getAlarms:'/software/lightController/findLightAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/lightController/LightAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/lightController/findLightHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/lightController/LightHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","lightId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","lightAddress"],
        ["name","lightName"],
        ["maxValue","lightMaxData"],
        ["minValue","lightMinData"],
        ["value","lightData"],
        ["intervalTime","intervalTime"],
        ["status","lightStatus"],
    ],
    status:[
        ["id","lightId"],
        ["status","lightStatus"],
        ["value","lightData"],
    ],
    alarm:[
        ["id","lightAlarmId"],
        ["deviceName","lightName"],
        ["description","info"],
        ["time","lightAlarmTime"]
    ],
    history:[
        ["id",'lightHistoryId'],
        ['value','lightData'],
        ['time','lightHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query