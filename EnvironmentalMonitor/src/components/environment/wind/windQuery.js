import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/windSpeedController/getWindSpeedManageAll',
    checkStatus:'/software/windSpeedController/findWindSpeedManageStatus',
    addDevice:'/software/windSpeedController/insertWindSpeedManage',
    updateDevice:'/software/windSpeedController/updateWindSpeedManage',
    deleteDevice:'/software/windSpeedController/deleteWindSpeedManage/${id}',
    getIps:'/software/windSpeedController/findWindSpeedDeviceIp',
    getAlarms:'/software/windSpeedController/findWindSpeedAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/windSpeedController/WindSpeedAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/windSpeedController/findWindSpeedHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/windSpeedController/WindSpeedHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","windSpeedId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","windSpeedAddress"],
        ["name","windSpeedName"],
        ["maxValue","windSpeedMaxData"],
        ["minValue","windSpeedMinData"],
        ["value","windSpeedData"],
        ["intervalTime","intervalTime"],
        ["status","windSpeedStatus"],
    ],
    status:[
        ["id","windSpeedId"],
        ["status","windSpeedStatus"],
        ["value","windSpeedData"],
    ],
    alarm:[
        ["id","windSpeedAlarmId"],
        ["deviceName","windSpeedName"],
        ["description","info"],
        ["time","windSpeedAlarmTime"]
    ],
    history:[
        ["id",'windSpeedHistoryId'],
        ['value','windSpeedData'],
        ['time','windSpeedHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query