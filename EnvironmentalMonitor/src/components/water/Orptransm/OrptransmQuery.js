import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/ORPMeter/findORPMeterManageAll',
    checkStatus:'/software/ORPMeter/findORPMeterStatus',
    addDevice:'/software/ORPMeter/insertORPMeterManage',
    updateDevice:'/software/ORPMeter/updateORPMeterManage',
    deleteDevice:'/software/ORPMeter/deleteORPMeterManage/${id}',
    getIps:'/software/ORPMeter/findORPMeterDeviceIp',
    getAlarms:'/software/ORPMeter/findORPMeterAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/ORPMeter/ORPMeterAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/ORPMeter/findORPMeterHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/ORPMeter/ORPMeterHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","orpMeterId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","orpMeterAddress"],
        ["name","orpMeterName"],
        ["maxValue","orpMeterMaxData"],
        ["minValue","orpMeterMinData"],
        ["value","orpMeterData"],
        ["intervalTime","intervalTime"],
        ["status","orpMeterStatus"],
    ],
    status:[
        ["id","orpMeterId"],
        ["status","orpMeterStatus"],
        ["value","orpMeterData"],
    ],
    alarm:[
        ["id","orpMeterAlarmId"],
        ["deviceName","orpMeterName"],
        ["description","info"],
        ["time","orpMeterAlarmTime"]
    ],
    history:[
        ["id",'orpMeterHistoryId'],
        ['value','orpMeterData'],
        ['time','orpMeterHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query