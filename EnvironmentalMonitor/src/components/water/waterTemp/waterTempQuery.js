import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/waterTempController/getWaterTempManageAll',
    checkStatus:'/software/waterTempController/findWaterTempManageStatus',
    addDevice:'/software/waterTempController/insertWaterTempManage',
    updateDevice:'/software/waterTempController/updateWaterTempManage',
    deleteDevice:'/software/waterTempController/deleteWaterTempManage/${id}',
    getIps:'/software/waterTempController/findWaterTempDeviceIp',
    getAlarms:'/software/waterTempController/findWaterTempAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/waterTempController/WaterTempAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/waterTempController/findWaterTempHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/waterTempController/WaterTempHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","waterTempId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","waterTempAddress"],
        ["name","waterTempName"],
        ["maxValue","waterTempMaxData"],
        ["minValue","waterTempMinData"],
        ["value","waterTempData"],
        ["intervalTime","intervalTime"],
        ["status","waterTempStatus"],
    ],
    status:[
        ["id","waterTempId"],
        ["status","waterTempStatus"],
        ["value","waterTempData"],
    ],
    alarm:[
        ["id","waterTempAlarmId"],
        ["deviceName","waterTempName"],
        ["description","info"],
        ["time","waterTempAlarmTime"]
    ],
    history:[
        ["id",'waterTempHistoryId'],
        ['value','waterTempData'],
        ['time','waterTempHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query