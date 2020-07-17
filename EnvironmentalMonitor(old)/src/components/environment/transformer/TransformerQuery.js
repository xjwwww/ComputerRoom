import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/transformer/findTransformerManageAll',
    checkStatus:'/software/transformer/findTransformerStatus',
    addDevice:'/software/transformer/insertTransformerManage',
    updateDevice:'/software/transformer/updateTransformerManage',
    deleteDevice:'/software/transformer/deleteTransformerManageById/${id}',
    getIps:'/software/transformer/findTransformerDeviceIp',
    getAlarms:'/software/transformer/findTransformerAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/transformer/transformerAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/transformer/findTransformerHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/transformer/transformerHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","transformerId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","transformerDeviceAddress"],
        ["timeInterval","intervalTime"],
        ["temperature","transformerTem"],
        ["humidity","transformerHum"],
        ["tempMaximum","transformerMaxTem"],
        ["tempMinimum","transformerMinTem"],
        ["humMaximum","transformerMaxHum"],
        ["humMinimum","transformerMinHum"],
        ["functionCode","transformerDeviceFunction"],
        ["name","transformerDeviceName"],
        ["status","transformerStatus"]
    ],
    status:[
        ["id","transformerId"],
        ["temperature","transformerTem"],
        ["humidity","transformerHum"],
        ["status","transformerStatus"]
    ],
    alarm:[
        ["id","transformerAlarmId"],
        ["deviceName","transformerName"],
        ["description","transformerAlarmInfo"],
        ["time","transformerAlarmTime"]
    ],
    history:[
        ["id",'transformerHistoryId'],
        ['temperature','transformerTem'],
        ['humidity','transformerHum'],
        ['time','transformerHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query