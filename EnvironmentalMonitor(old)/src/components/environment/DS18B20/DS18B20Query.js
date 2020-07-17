import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/humiture18B20/findHumiture18B20ManageAll',
    checkStatus:'/software/humiture18B20/findHumiture18B20Status',
    addDevice:'/software/humiture18B20/insertHumiture18B20Manage',
    updateDevice:'/software/humiture18B20/updateHumiture18B20Manage',
    deleteDevice:'/software/humiture18B20/deleteHumiture18B20Manage/${id}',
    getIps:'/software/humiture18B20/findHumiture18B20DeviceIp',
    getAlarms:'/software/humiture18B20/findHumiture18B20Alarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/humiture18B20/Humiture18B20AlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/humiture18B20/findHumiture18B20History/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/humiture18B20/Humiture18B20HistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","ehbmId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","ehbmDeviceAddress"],
        ["gallery","gallery"],
        ["intervalTime","intervalTime"],
        ["temperature","ehbmTemp"],
        ["tempMaximum","ehbmMaxTemp"],
        ["tempMinimum","ehbmMinTemp"],
        ["name","ehbmDeviceName"],
        ["status","ehbmStatus"],
    ],
    status:[
        ["id","ehbmId"],
        ["temperature","ehbmTemp"],
        ["humidity","ehbmHum"],
        ["status","ehbmStatus"]
    ],
    alarm:[
        ["id","ehbaId"],
        ["deviceName","ehaName"],
        ["description","ehbaInfo"],
        ["time","ehbaTime"]
    ],
    history:[
        ["id",'ehbhId'],
        ['temperature','ehbhTemp'],
        ['time','ehbhTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query