import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/waterLevelController/getWaterLevelManageAll',
    checkStatus:'/software/waterLevelController/findWaterLevelManageStatus',
    addDevice:'/software/waterLevelController/insertWaterLevelManage',
    updateDevice:'/software/waterLevelController/updateWaterLevelManage',
    deleteDevice:'/software/waterLevelController/deleteWaterLevelManage/${id}',
    getIps:'/software/waterLevelController/findWaterLevelDeviceIp',
    getAlarms:'/software/waterLevelController/findWaterLevelAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/waterLevelController/WaterLevelAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/waterLevelController/findWaterLevelHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/waterLevelController/WaterLevelHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","waterLevelId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","waterLevelAddress"],
        ["name","waterLevelName"],
        ["maxValue","waterLevelMaxData"],
        ["minValue","waterLevelMinData"],
        ["value","waterLevelData"],
        ["intervalTime","intervalTime"],
        ["status","waterLevelStatus"],
    ],
    status:[
        ["id","waterLevelId"],
        ["status","waterLevelStatus"],
        ["value","waterLevelData"],
    ],
    alarm:[
        ["id","waterLevelAlarmId"],
        ["deviceName","waterLevelName"],
        ["description","info"],
        ["time","waterLevelAlarmTime"]
    ],
    history:[
        ["id",'waterLevelHistoryId'],
        ['value','waterLevelData'],
        ['time','waterLevelHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query