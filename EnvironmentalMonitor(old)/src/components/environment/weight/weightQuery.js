import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/weighController/getWeighManageAll',
    checkStatus:'/software/weighController/findWeighManageStatus',
    addDevice:'/software/weighController/insertWeighManage',
    updateDevice:'/software/weighController/updateWeighManage',
    deleteDevice:'/software/weighController/deleteWeighManage/${id}',
    getIps:'/software/weighController/findWeighDeviceIp',
    getAlarms:'/software/weighController/findWeighAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/weighController/weighAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/weighController/findWeighHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/weighController/weighHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","weighId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","weighAddress"],
        ["name","weighName"],
        ["maxValue","weighMaxData"],
        ["minValue","weighMinData"],
        ["value","weighData"],
        ["intervalTime","intervalTime"],
        ["status","weighStatus"],
    ],
    status:[
        ["id","weighId"],
        ["status","weighStatus"],
        ["value","weighData"],
    ],
    alarm:[
        ["id","weighAlarmId"],
        ["deviceName","weighName"],
        ["description","info"],
        ["time","weighAlarmTime"]
    ],
    history:[
        ["id",'weighHistoryId'],
        ['value','weighData'],
        ['time','weighHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query