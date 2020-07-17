import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/patchController/getPatchTemperatureManageAll',
    checkStatus:'/software/patchController/findPatchTemperatureManageStatus',
    addDevice:'/software/patchController/insertPatchTemperatureManage',
    updateDevice:'/software/patchController/updatePatchTemperatureManage',
    deleteDevice:'/software/patchController/deletePatchTemperatureManage/${id}',
    getIps:'/software/patchController/findPatchTemperatureDeviceIp',
    getAlarms:'/software/patchController/findPatchTemperatureAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/patchController/patchTemperatureAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/patchController/findPatchTemperatureHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/patchController/patchTemperatureHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","patchId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","patchAddress"],
        ["name","patchName"],
        ["maxValue","patchMaxData"],
        ["minValue","patchMinData"],
        ["value","patchData"],
        ["intervalTime","intervalTime"],
        ["status","patchStatus"],
    ],
    status:[
        ["id","patchId"],
        ["status","patchStatus"],
        ["value","patchData"],
    ],
    alarm:[
        ["id","patchAlarmId"],
        ["deviceName","patchName"],
        ["description","info"],
        ["time","patchAlarmTime"]
    ],
    history:[
        ["id",'patchHistoryId'],
        ['value','patchData'],
        ['time','patchHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query