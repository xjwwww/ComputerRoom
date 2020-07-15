import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/codController/getCODManageAll',
    checkStatus:'/software/codController/findCODManageStatus',
    addDevice:'/software/codController/insertCODManage',
    updateDevice:'/software/codController/updateCODManage',
    deleteDevice:'/software/codController/deleteCODManage/${id}',
    getIps:'/software/codController/findCODDeviceIp',
    getAlarms:'/software/codController/findCODAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/codController/cODAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/codController/findCODHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/codController/cODHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","codId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","codAddress"],
        ["name","codName"],
        ["maxValue","codMaxData"],
        ["minValue","codMinData"],
        ["value","codData"],
        ["intervalTime","intervalTime"],
        ["status","codStatus"],
    ],
    status:[
        ["id","codId"],
        ["status","codStatus"],
        ["value","codData"],
    ],
    alarm:[
        ["id","codAlarmId"],
        ["deviceName","codName"],
        ["description","info"],
        ["time","codAlarmTime"]
    ],
    history:[
        ["id",'codHistoryId'],
        ['value','codData'],
        ['time','codHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query