import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/waterFlowController/getWaterFlowManageAll',
    checkStatus:'/software/waterFlowController/findWaterFlowManageStatus',
    addDevice:'/software/waterFlowController/insertWaterFlowManage',
    updateDevice:'/software/waterFlowController/updateWaterFlowManage',
    deleteDevice:'/software/waterFlowController/deleteWaterFlowManage/${id}',
    getIps:'/software/waterFlowController/findWaterFlowDeviceIp',
    getAlarms:'/software/waterFlowController/findWaterFlowAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/waterFlowController/WaterFlowAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/waterFlowController/findWaterFlowHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/waterFlowController/WaterFlowHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","waterFlowId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","waterFlowAddress"],
        ["name","waterFlowName"],
        ["maxValue","waterFlowMaxData"],
        ["minValue","waterFlowMinData"],
        ["value","waterFlowData"],
        ["intervalTime","intervalTime"],
        ["status","waterFlowStatus"],
    ],
    status:[
        ["id","waterFlowId"],
        ["status","waterFlowStatus"],
        ["value","waterFlowData"],
    ],
    alarm:[
        ["id","waterFlowAlarmId"],
        ["deviceName","waterFlowName"],
        ["description","info"],
        ["time","waterFlowAlarmTime"]
    ],
    history:[
        ["id",'waterFlowHistoryId'],
        ['value','waterFlowData'],
        ['time','waterFlowHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query