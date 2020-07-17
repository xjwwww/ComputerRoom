import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/batteryController/getBatteryManageAll',
    checkStatus:'/software/batteryController/findBatteryManageStatus',
    addDevice:'/software/batteryController/insertBatteryManage',
    updateDevice:'/software/batteryController/updateBatteryManage',
    deleteDevice:'/software/batteryController/deleteBatteryManage/${id}',
    getIps:'/software/batteryController/findBatteryDeviceIp',
    getAlarms:'/software/batteryController/findBatteryAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/batteryController/batteryAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/batteryController/findBatteryHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/batteryController/batteryHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","batteryId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","batteryAddress"],
        ["name","batteryName"],
        ["maxValue","batteryMaxData"],
        ["minValue","batteryMinData"],
        ["value","batteryData"],
        ["intervalTime","intervalTime"],
        ["status","batteryStatus"],
    ],
    status:[
        ["id","batteryId"],
        ["status","batteryStatus"],
        ["value","batteryData"],
    ],
    alarm:[
        ["id","batteryAlarmId"],
        ["deviceName","batteryName"],
        ["description","info"],
        ["time","batteryAlarmTime"]
    ],
    history:[
        ["id",'batteryHistoryId'],
        ['value','batteryData'],
        ['time','batteryHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query