import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/flowCellMeter/findFlowCellMeterManageAll',
    checkStatus:'/software/flowCellMeter/findFlowCellMeterStatus',
    addDevice:'/software/flowCellMeter/insertFlowCellMeterManage',
    updateDevice:'/software/flowCellMeter/updateFlowCellMeterManage',
    deleteDevice:'/software/flowCellMeter/deleteFlowCellMeterManage/${id}',
    getIps:'/software/flowCellMeter/findFlowCellMeterDeviceIp',
    getAlarms:'/software/flowCellMeter/findFlowCellMeterAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/flowCellMeter/flowCellMeterAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/flowCellMeter/findFlowCellMeterHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/flowCellMeter/flowCellMeterHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","flowCellId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","flowCellAddress"],
        ["timeInterval","intervalTime"],
        ["edomdoTemp","temp"],//温度
        ["edomo2Value","phValue"],//PH值
        ["tempMaximum","maxTemp"],
        ["tempMinimum","minTemp"],
        ["edomO2Maximum","maxPh"], //humMaximum
        ["edomO2Minimum","minPh"], //humMinimum
        ["name","flowCellName"],
        ["status","flowCellStatus"]
    ],
    status:[
        ["id","ehmpId"],
        ["edomdoTemp","ehmpDoTemp"],
        ["edomo2Value","ehmpO2Value"],
        ["status","ehmpStatus"]
    ],
    alarm:[
        ["id","flowCellAlarmId"],
        ["deviceName","flowCellName"],
        ["description","info"],
        ["time","flowCellAlarmTime"]
    ],
    history:[
        ["id",'flowCellHistoryId'],
        ['edomdoTemp','temp'],
        ['edomo2Value','phValue'],
        ['time','flowCellHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query