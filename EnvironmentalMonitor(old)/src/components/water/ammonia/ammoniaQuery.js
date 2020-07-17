import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/ammoniaController/getAmmoniaManageAll',
    checkStatus:'/software/ammoniaController/findAmmoniaManageStatus',
    addDevice:'/software/ammoniaController/insertAmmoniaManage',
    updateDevice:'/software/ammoniaController/updateAmmoniaManage',
    deleteDevice:'/software/ammoniaController/deleteAmmoniaManage/${id}',
    getIps:'/software/ammoniaController/findAmmoniaDeviceIp',
    getAlarms:'/software/ammoniaController/findAmmoniaAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/ammoniaController/ammoniaAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/ammoniaController/findAmmoniaHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/ammoniaController/ammoniaHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","ammoniaId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","ammoniaAddress"],
        ["name","ammoniaName"],
        ["maxValue","ammoniaMaxData"],
        ["minValue","ammoniaMinData"],
        ["value","ammoniaData"],
        ["intervalTime","intervalTime"],
        ["status","ammoniaStatus"],
    ],
    status:[
        ["id","ammoniaId"],
        ["status","ammoniaStatus"],
        ["value","ammoniaData"],
    ],
    alarm:[
        ["id","ammoniaAlarmId"],
        ["deviceName","ammoniaName"],
        ["description","info"],
        ["time","ammoniaAlarmTime"]
    ],
    history:[
        ["id",'ammoniaHistoryId'],
        ['value','ammoniaData'],
        ['time','ammoniaHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query