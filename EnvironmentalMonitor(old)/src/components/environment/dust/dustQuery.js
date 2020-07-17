import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/dust/getDustAll',
    checkStatus:'/software/dust/getDustStatus',
    addDevice:'/software/dust/insertDust',
    updateDevice:'/software/dust/updateDust',
    deleteDevice:'/software/dust/deleteDust/${id}',
    getIps:'/software/dust/findDustDeviceIp',
    getAlarms:'/software/dust/findDustAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/dust/dustAlarmExcel/${deviceId}/${startTime}/${endTime}',
}

const transformFormat={
    device:[
        ["deviceId","edmId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","edmAddress"],
        ["name","edmName"],
        ["value","edmCurrentData"],
        ["alarmValue","edmAlarmData"],
        ["status","edmStatus"],
        ["intervalTime","intervalTime"]
    ],
    status:[
        ["id","edmId"],
        ["value","edmCurrentData"],
        ["status","edmStatus"],
    ],
    alarm:[
        ["id","edaId"],
        ["deviceName","edmName"],
        ["description","edaInfo"],
        ["time","edaTime"]
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query