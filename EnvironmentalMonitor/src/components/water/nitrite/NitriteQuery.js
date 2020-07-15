import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/nitriteController/getNitriteManageAll',
    checkStatus:'/software/nitriteController/findNitriteManageStatus',
    addDevice:'/software/nitriteController/insertNitriteManage',
    updateDevice:'/software/nitriteController/updateNitriteManage',
    deleteDevice:'/software/nitriteController/deleteNitriteManage/${id}',
    getIps:'/software/nitriteController/findNitriteDeviceIp',
    getAlarms:'/software/nitriteController/findNitriteAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/nitriteController/NitriteAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/nitriteController/findNitriteHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/nitriteController/NitriteHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","nitriteId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","nitriteAddress"],
        ["name","nitriteName"],
        ["maxValue","nitriteMaxData"],
        ["minValue","nitriteMinData"],
        ["value","nitriteData"],
        ["intervalTime","intervalTime"],
        ["status","nitriteStatus"],
    ],
    status:[
        ["id","nitriteId"],
        ["status","nitriteStatus"],
        ["value","nitriteData"],
    ],
    alarm:[
        ["id","nitriteAlarmId"],
        ["deviceName","nitriteName"],
        ["description","info"],
        ["time","nitriteAlarmTime"]
    ],
    history:[
        ["id",'nitriteHistoryId'],
        ['value','nitriteData'],
        ['time','nitriteHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query