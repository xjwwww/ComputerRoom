import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/waterPressureController/getWaterPressureManageAll',
    checkStatus:'/software/waterPressureController/findWaterPressureManageStatus',
    addDevice:'/software/waterPressureController/insertWaterPressureManage',
    updateDevice:'/software/waterPressureController/updateWaterPressureManage',
    deleteDevice:'/software/waterPressureController/deleteWaterPressureManage/${id}',
    getIps:'/software/waterPressureController/findWaterPressureDeviceIp',
    getAlarms:'/software/waterPressureController/findWaterPressureAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/waterPressureController/waterPressureAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/waterPressureController/findWaterPressureHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/waterPressureController/waterPressureHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","waterPressureId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","waterPressureAddress"],
        ["name","waterPressureName"],
        ["maxValue","waterPressureMaxData"],
        ["minValue","waterPressureMinData"],
        ["value","waterPressureData"],
        ["intervalTime","intervalTime"],
        ["status","waterPressureStatus"],
    ],
    status:[
        ["id","waterPressureId"],
        ["status","waterPressureStatus"],
        ["value","waterPressureData"],
    ],
    alarm:[
        ["id","waterPressureAlarmId"],
        ["deviceName","waterPressureName"],
        ["description","info"],
        ["time","waterPressureAlarmTime"]
    ],
    history:[
        ["id",'waterPressureHistoryId'],
        ['value','waterPressureData'],
        ['time','waterPressureHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query