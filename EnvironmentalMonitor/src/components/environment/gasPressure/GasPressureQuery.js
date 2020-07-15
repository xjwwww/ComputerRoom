import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/gasPressureController/getGasPressureManageAll',
    checkStatus:'/software/gasPressureController/findGasPressureManageStatus',
    addDevice:'/software/gasPressureController/insertGasPressureManage',
    updateDevice:'/software/gasPressureController/updateGasPressureManage',
    deleteDevice:'/software/gasPressureController/deleteGasPressureManage/${id}',
    getIps:'/software/gasPressureController/findGasPressureDeviceIp',
    getAlarms:'/software/gasPressureController/findGasPressureAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/gasPressureController/GasPressureAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/gasPressureController/findGasPressureHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/gasPressureController/GasPressureHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","gasPressureId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","gasPressureAddress"],
        ["name","gasPressureName"],
        ["maxValue","gasPressureMaxData"],
        ["minValue","gasPressureMinData"],
        ["value","gasPressureData"],
        ["intervalTime","intervalTime"],
        ["status","gasPressureStatus"],
    ],
    status:[
        ["id","gasPressureId"],
        ["status","gasPressureStatus"],
        ["value","gasPressureData"],
    ],
    alarm:[
        ["id","gasPressureAlarm_id"],
        ["deviceName","gasPressureName"],
        ["description","info"],
        ["time","gasPressureAlarmTime"]
    ],
    history:[
        ["id",'gasPressureHistoryId'],
        ['value','gasPressureData'],
        ['time','gasPressureHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query