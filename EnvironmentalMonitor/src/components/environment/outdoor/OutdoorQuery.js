import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/outdoorHumiture/findOutdoorHumitureManageAll',
    checkStatus:'/software/outdoorHumiture/findOutdoorHumitureStatus',
    addDevice:'/software/outdoorHumiture/insertOutdoorHumitureManage',
    updateDevice:'/software/outdoorHumiture/updateOutdoorHumitureManage',
    deleteDevice:'/software/outdoorHumiture/deleteOutdoorHumitureManageById/${id}',
    getIps:'/software/outdoorHumiture/findOutdoorHumitureDeviceIp',
    getAlarms:'/software/outdoorHumiture/findOutdoorHumitureAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/outdoorHumiture/outdoorHumitureAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/outdoorHumiture/findOutdoorHumitureHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/outdoorHumiture/outdoorHumitureHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","outdoorHumitureId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","outdoorHumitureDeviceAddress"],
        ["timeInterval","intervalTime"],
        ["temperature","outdoorHumitureTem"],
        ["humidity","outdoorHumitureHum"],
        ["tempMaximum","outdoorHumitureMaxTem"],
        ["tempMinimum","outdoorHumitureMinTem"],
        ["humMaximum","outdoorHumitureMaxHum"],
        ["humMinimum","outdoorHumitureMinHum"],
        ["functionCode","outdoorHumitureDeviceFunction"],
        ["name","outdoorHumitureDeviceName"],
        ["status","outdoorHumitureStatus"]
    ],
    status:[
        ["id","outdoorHumitureId"],
        ["temperature","outdoorHumitureTem"],
        ["humidity","outdoorHumitureHum"],
        ["status","outdoorHumitureStatus"]
    ],
    alarm:[
        ["id","outdoorHumitureAlarmId"],
        ["deviceName","outdoorHumitureName"],
        ["description","outdoorHumitureAlarmInfo"],
        ["time","outdoorHumitureAlarmTime"]
    ],
    history:[
        ["id",'outdoorHumitureHistoryId'],
        ['temperature','outdoorHumitureTem'],
        ['humidity','outdoorHumitureHum'],
        ['time','outdoorHumitureHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query