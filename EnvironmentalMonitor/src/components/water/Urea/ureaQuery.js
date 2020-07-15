import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/ureaController/getUreaManageAll',
    checkStatus:'/software/ureaController/findUreaManageStatus',
    addDevice:'/software/ureaController/insertUreaManage',
    updateDevice:'/software/ureaController/updateUreaManage',
    deleteDevice:'/software/ureaController/deleteUreaManage/${id}',
    getIps:'/software/ureaController/findUreaDeviceIp',
    getAlarms:'/software/ureaController/findUreaAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/ureaController/ureaAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/ureaController/findUreaHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/ureaController/ureaHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","ureaId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","ureaAddress"],
        ["name","ureaName"],
        ["maxValue","ureaMaxData"],
        ["minValue","ureaMinData"],
        ["value","ureaData"],
        ["intervalTime","intervalTime"],
        ["status","ureaStatus"],
    ],
    status:[
        ["id","ureaId"],
        ["status","ureaStatus"],
        ["value","ureaData"],
    ],
    alarm:[
        ["id","ureaAlarmId"],
        ["deviceName","ureaName"],
        ["description","info"],
        ["time","ureaAlarmTime"]
    ],
    history:[
        ["id",'ureaHistoryId'],
        ['value','ureaData'],
        ['time','ureaHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query