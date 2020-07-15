import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/opticalController/getOpticalFiberTempManageAll',
    checkStatus:'/software/opticalController/findOpticalFiberTempManageStatus',
    addDevice:'/software/opticalController/insertOpticalFiberTempManage',
    updateDevice:'/software/opticalController/updateOpticalFiberTempManage',
    deleteDevice:'/software/opticalController/deleteOpticalFiberTempManage/${id}',
    getIps:'/software/opticalController/findOpticalFiberTempDeviceIp',
    getAlarms:'/software/opticalController/findOpticalFiberTempAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/opticalController/opticalFiberTempAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/opticalController/findOpticalFiberTempHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/opticalController/opticalFiberTempHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","opticalId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","opticalAddress"],
        ["name","opticalName"],
        ["maxValue","opticalMaxData"],
        ["minValue","opticalMinData"],
        ["value","opticalData"],
        ["intervalTime","intervalTime"],
        ["status","opticalStatus"],
    ],
    status:[
        ["id","opticalId"],
        ["status","opticalStatus"],
        ["value","opticalData"],
    ],
    alarm:[
        ["id","opticalAlarmId"],
        ["deviceName","opticalName"],
        ["description","info"],
        ["time","opticalAlarmTime"]
    ],
    history:[
        ["id",'opticalHistoryId'],
        ['value','opticalData'],
        ['time','opticalHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query