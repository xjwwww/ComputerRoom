import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/poisonous/getPoisonousAll',
    checkStatus:'/software/poisonous/getPoisonousStatus',
    addDevice:'/software/poisonous/insertPoisonous',
    updateDevice:'/software/poisonous/updatePoisonous',
    deleteDevice:'/software/poisonous/deletePoisonous/${id}',
    getIps:'/software/poisonous/findPoisonousDeviceIp',
    getAlarms:'/software/poisonous/findPoisonousAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/poisonous/poisonousAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/poisonous/findPoisonousHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/poisonous/poisonousHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","ecmId"],
        ["address","ecmAddress"],
        ["name","ecmName"],
        ["alarmValue","ecmAlarmData"],
        ["value","ecmCurrentData"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["status","ecmStatus"],
        ["intervalTime","intervalTime"]
    ],
    status:[
        ["id","ecmId"],
        ["value","ecmCurrentData"],
        ["status","ecmStatus"]
    ],
    alarm:[
        ["id","ecaId"],
        ["deviceName","ecmName"],
        ["description","ecaInfo"],
        ["time","ecaTime"]
    ],
    history:[
        ["id",'ephId'],
        ['value','ephData'],
        ['time','ephTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query