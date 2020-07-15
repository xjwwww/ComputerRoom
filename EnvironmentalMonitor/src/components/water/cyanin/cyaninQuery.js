import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/cyaninController/getCyaninManageAll',
    checkStatus:'/software/cyaninController/findCyaninManageStatus',
    addDevice:'/software/cyaninController/insertCyaninManage',
    updateDevice:'/software/cyaninController/updateCyaninManage',
    deleteDevice:'/software/cyaninController/deleteCyaninManage/${id}',
    getIps:'/software/cyaninController/findCyaninDeviceIp',
    getAlarms:'/software/cyaninController/findCyaninAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/cyaninController/cyaninAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/cyaninController/findCyaninHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/cyaninController/cyaninHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","cyaninId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","cyaninAddress"],
        ["timeInterval","intervalTime"],
        ["edomdoTemp","cyaninData"],//蓝藻素浓度
        ["edomo2Value","temp"],// 温度
        ["tempMaximum","cyaninMaxData"],  //蓝藻素最大浓度
        ["tempMinimum","cyaninMinData"],  //蓝藻素最小浓度
        ["humMaximum","maxTemp"], //最大温度
        ["humMinimum","minTemp"], //最小温度
        ["name","cyaninName"],
        ["status","cyaninStatus"]
    ],
    status:[
        ["id","cyaninId"],
        ["edomdoTemp","cyaninData"],
        ["edomo2Value","temp"],
        ["status","cyaninStatus"]
    ],
    alarm:[
        ["id","cyaninId"],
        ["deviceName","cyaninName"],
        ["description","info"],
        ["time","cyaninAlarmTime"]
    ],
    history:[
        ["id",'cyaninId'],
        ['edomdoTemp','cyaninData'],
        ['edomo2Value','temp'],
        ['time','cyaninHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query