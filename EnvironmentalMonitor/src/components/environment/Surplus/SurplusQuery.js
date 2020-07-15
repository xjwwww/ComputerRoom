import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/electricalFireAlarm/findElectricalFireAlarmManageAll',
    checkStatus:'/software/electricalFireAlarm/findElectricalFireAlarmStatus',
    addDevice:'/software/electricalFireAlarm/insertElectricalFireAlarmManage',
    updateDevice:'/software/electricalFireAlarm/updateElectricalFireAlarmManage',
    deleteDevice:'/software/electricalFireAlarm/deleteElectricalFireAlarmManageById/${id}',
    getIps:'/software/electricalFireAlarm/findElectricalFireAlarmDeviceIp',
    getAlarms:'/software/electricalFireAlarm/findElectricalFireAlarmAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/electricalFireAlarm/electricalFireAlarmAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/electricalFireAlarm/findElectricalFireAlarmHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/electricalFireAlarm/electricalFireAlarmHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","electricalFireId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","electricalFireAddress"],
        ["timeInterval","intervalTime"],
        ["temperature","temp"],//温度
        ["humidity","current"], //电流
        ["tempMaximum","maxTemp"],
        ["tempMinimum","minTemp"],
        ["humMaximum","maxCurrent"],
        ["humMinimum","minCurrent"],
        // ["functionCode","ehmpDeviceFunction"],
        ["name","electricalFireName"],
        ["status","electricalFireStatus"]
    ],
    status:[
        ["id","ehmpId"],
        ["temperature","ehmpTemp"],
        ["humidity","ehmpHum"],
        ["status","ehmpStatus"]
    ],
    alarm:[
        ["id","electricalFireId"],
        ["deviceName","electricalFireName"],
        ["description","info"],
        ["time","electricalFireAlarmTime"]
    ],
    history:[
        ["id",'electricalFireId'],
        ['temperature','temp'],
        ['humidity','current'],
        ['time','electricalFireHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query