import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/phosphorusController/getPhosphorusManageAll',
    checkStatus:'/software/phosphorusController/findPhosphorusManageStatus',
    addDevice:'/software/phosphorusController/insertPhosphorusManage',
    updateDevice:'/software/phosphorusController/updatePhosphorusManage',
    deleteDevice:'/software/phosphorusController/deletePhosphorusManage/${id}',
    getIps:'/software/phosphorusController/findPhosphorusDeviceIp',
    getAlarms:'/software/phosphorusController/findPhosphorusAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/phosphorusController/phosphorusAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/phosphorusController/findPhosphorusHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/phosphorusController/phosphorusHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","phosphorusId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","phosphorusAddress"],
        ["name","phosphorusName"],
        ["maxValue","phosphorusMaxData"],
        ["minValue","phosphorusMinData"],
        ["value","phosphorusData"],
        ["intervalTime","intervalTime"],
        ["status","phosphorusStatus"],
    ],
    status:[
        ["id","phosphorusId"],
        ["status","phosphorusStatus"],
        ["value","phosphorusData"],
    ],
    alarm:[
        ["id","phosphorusAlarmId"],
        ["deviceName","phosphorusName"],
        ["description","info"],
        ["time","phosphorusAlarmTime"]
    ],
    history:[
        ["id",'phosphorusHistoryId'],
        ['value','phosphorusData'],
        ['time','phosphorusHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query