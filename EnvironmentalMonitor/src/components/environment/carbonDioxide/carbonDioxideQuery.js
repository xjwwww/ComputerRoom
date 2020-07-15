import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/co2/getCo2ManageAll',
    checkStatus:'/software/co2/findCo2Status',
    addDevice:'/software/co2/insertCo2Manage',
    updateDevice:'/software/co2/updateCo2Manage',
    deleteDevice:'/software/co2/deleteCo2Manage/${id}',
    getIps:'/software/co2/findCo2DeviceIp',
    getAlarms:'/software/co2/findCo2Alarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/co2/co2AlarmExcel/${deviceId}/${startTime}/${endTime}',
}

const transformFormat={
    device:[
        ["deviceId","ecmId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","ecmAddress"],
        ["name","ecmName"],
        ["alarmValue","ecmAlarmData"],
        ["value","ecmCurrentData"],
        ["status","ecmStatus"],
    ],
    status:[
        ["id","ecmId"],
        ["status","ecmStatus"],
        ["value","ecmCurrentData"],
    ],
    alarm:[
        ["id","ecaId"],
        ["deviceName","ecmName"],
        ["description","ecaInfo"],
        ["time","ecaTime"]
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query