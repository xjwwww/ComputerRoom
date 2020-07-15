import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/conductance/getConductanceManageAll',
    checkStatus:'/software/conductance/findConductanceManageStatus',
    addDevice:'/software/conductance/insertConductanceManage',
    updateDevice:'/software/conductance/updateConductanceManage',
    deleteDevice:'/software/conductance/deleteConductanceManage/${id}',
    getIps:'/software/conductance/findConductanceDeviceIp',
    getAlarms:'/software/conductance/findConductanceAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/conductance/conductanceAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/conductance/findConductanceHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/conductance/conductanceHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","conId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","conAddress"],
        ["name","conName"],
        ["maxValue","conMaxData"],
        ["minValue","conMinData"],
        ["value","conData"],
        ["intervalTime","intervalTime"],
        ["status","conStatus"],
    ],
    status:[
        ["id","conId"],
        ["status","conStatus"],
        ["value","conData"],
    ],
    alarm:[
        ["id","conAlarmId"],
        ["deviceName","conName"],
        ["description","info"],
        ["time","conAlarmTime"]
    ],
    history:[
        ["id",'conHistoryId'],
        ['value','conData'],
        ['time','conHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query