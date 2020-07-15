import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/humiturept100/findHumiturePT100ManageAll',
    checkStatus:'/software/humiturept100/findHumiturePT100Status',
    addDevice:'/software/humiturept100/insertHumiturePT100Manage',
    updateDevice:'/software/humiturept100/updateHumiturePT100Manage',
    deleteDevice:'/software/humiturept100/deleteHumiturePT100Manage/${id}',
    getIps:'/software/humiturept100/findHumiturePT100DeviceIp',
    getAlarms:'/software/humiturept100/findHumiturePT100Alarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/humiturept100/humiturePT100AlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/humiturept100/findHumiturePT100History/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/humiturept100/humiturePT100HistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","ehmpId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","ehmpDeviceAddress"],
        ["gallery","gallery"],
        ["intervalTime","intervalTime"],
        ["temperature","ehmpTemp"],
        ["tempMaximum","ehmpMaxTemp"],
        ["tempMinimum","ehmpMinTemp"],
        ["name","ehmpDeviceName"],
        ["status","ehmpStatus"],
        ["wireLength","wireLength"]
    ],
    status:[
        ["id","ehmpId"],
        ["temperature","ehmpTemp"],
        ["humidity","ehmpHum"],
        ["status","ehmpStatus"]
    ],
    alarm:[
        ["id","ehpaId"],
        ["deviceName","ehaName"],
        ["description","ehpaInfo"],
        ["time","ehpaTime"]
    ],
    history:[
        ["id",'ehphId'],
        ['temperature','ehphTemp'],
        ['time','ehphTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query