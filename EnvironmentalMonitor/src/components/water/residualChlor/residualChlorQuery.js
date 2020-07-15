import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/residualChlorineController/getResidualChlorineManageAll',
    checkStatus:'/software/residualChlorineController/findResidualChlorineManageStatus',
    addDevice:'/software/residualChlorineController/insertResidualChlorineManage',
    updateDevice:'/software/residualChlorineController/updateResidualChlorineManage',
    deleteDevice:'/software/residualChlorineController/deleteResidualChlorineManage/${id}',
    getIps:'/software/residualChlorineController/findResidualChlorineDeviceIp',
    getAlarms:'/software/residualChlorineController/findResidualChlorineAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/residualChlorineController/residualChlorineAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/residualChlorineController/findResidualChlorineHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/residualChlorineController/residualChlorineHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","residualChlorineId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","residualChlorineAddress"],
        ["name","residualChlorineName"],
        ["maxValue","residualChlorineMaxData"],
        ["minValue","residualChlorineMinData"],
        ["value","residualChlorineData"],
        ["intervalTime","intervalTime"],
        ["status","residualChlorineStatus"],
    ],
    status:[
        ["id","residualChlorineId"],
        ["status","residualChlorineStatus"],
        ["value","residualChlorineData"],
    ],
    alarm:[
        ["id","residualChlorineAlarmId"],
        ["deviceName","residualChlorineName"],
        ["description","info"],
        ["time","residualChlorineAlarmTime"]
    ],
    history:[
        ["id",'residualChlorineHistoryId'],
        ['value','residualChlorineData'],
        ['time','residualChlorineHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query