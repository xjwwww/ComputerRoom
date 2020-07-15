import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/location/getLocationAll',
    checkStatus:'/software/location/getLocationStatus',
    addDevice:'/software/location/insertLocation',
    updateDevice:'/software/location/updateLocation',
    deleteDevice:'/software/location/deleteLocation/${id}',
    getIps:'/software/location/findLocationDeviceIp',
    getAlarms:'/software/location/findLocationAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/location/locationAlarmExcel/${deviceId}/${startTime}/${endTime}',
}

const transformFormat={
    device:[
        ["deviceId","elmId"],
        ["name","elmName"],
        ["address","elmAddress"],
        ["status","elmStatus"],
        ["length","elmLength"],
        ["groupId","gId"],
        ["ipId","diId"]
    ],
    status:[
        ["id","elmId"],
        ["length","elmLength"],
        ["status","elmStatus"]
    ]
    , alarm:[
        ["id","elmId"],
        ["deviceName","elmName"],
        ["description","elaInfo"],
        ["time","time"]
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query