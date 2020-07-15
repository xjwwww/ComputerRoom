import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/salinityController/getSalinityManageAll',
    checkStatus:'/software/salinityController/findSalinityManageStatus',
    addDevice:'/software/salinityController/insertSalinityManage',
    updateDevice:'/software/salinityController/updateSalinityManage',
    deleteDevice:'/software/salinityController/deleteSalinityManage/${id}',
    getIps:'/software/salinityController/findSalinityDeviceIp',
    getAlarms:'/software/salinityController/findSalinityAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/salinityController/SalinityAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/salinityController/findSalinityHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/salinityController/SalinityHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","salinityId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","salinityAddress"],
        ["name","salinityName"],
        ["maxValue","salinityMaxData"],
        ["minValue","salinityMinData"],
        ["value","salinityData"],
        ["intervalTime","intervalTime"],
        ["status","salinityStatus"],
    ],
    status:[
        ["id","salinityId"],
        ["status","salinityStatus"],
        ["value","salinityData"],
    ],
    alarm:[
        ["id","salinityAlarmId"],
        ["deviceName","salinityName"],
        ["description","info"],
        ["time","salinityAlarmTime"]
    ],
    history:[
        ["id",'salinityHistoryId'],
        ['value','salinityData'],
        ['time','salinityHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query