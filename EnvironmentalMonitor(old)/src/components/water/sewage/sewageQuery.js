import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/sewageDischargeController/getSewageDischargeManageAll',
    checkStatus:'/software/sewageDischargeController/findSewageDischargeManageStatus',
    addDevice:'/software/sewageDischargeController/insertSewageDischargeManage',
    updateDevice:'/software/sewageDischargeController/updateSewageDischargeManage',
    deleteDevice:'/software/sewageDischargeController/deleteSewageDischargeManage/${id}',
    getIps:'/software/sewageDischargeController/findSewageDischargeDeviceIp',
    getAlarms:'/software/sewageDischargeController/findSewageDischargeAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/sewageDischargeController/sewageDischargeAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/sewageDischargeController/findSewageDischargeHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/sewageDischargeController/sewageDischargeHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","sewageDischargeId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","sewageDischargeAddress"],
        ["name","sewageDischargeName"],
        ["maxValue","sewageDischargeMaxData"],
        ["minValue","sewageDischargeMinData"],
        ["value","sewageDischargeData"],
        ["intervalTime","intervalTime"],
        ["status","sewageDischargeStatus"],
    ],
    status:[
        ["id","sewageDischargeId"],
        ["status","sewageDischargeStatus"],
        ["value","sewageDischargeData"],
    ],
    alarm:[
        ["id","sewageDischargeAlarmId"],
        ["deviceName","sewageDischargeName"],
        ["description","info"],
        ["time","sewageDischargeAlarmTime"]
    ],
    history:[
        ["id",'sewageDischargeHistoryId'],
        ['value','sewageDischargeData'],
        ['time','sewageDischargeHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query