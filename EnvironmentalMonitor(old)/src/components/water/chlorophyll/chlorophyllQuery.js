import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/chlorophyllController/getChlorophyllManageAll',
    checkStatus:'/software/chlorophyllController/findChlorophyllManageStatus',
    addDevice:'/software/chlorophyllController/insertChlorophyllManage',
    updateDevice:'/software/chlorophyllController/updateChlorophyllManage',
    deleteDevice:'/software/chlorophyllController/deleteChlorophyllManage/${id}',
    getIps:'/software/chlorophyllController/findChlorophyllDeviceIp',
    getAlarms:'/software/chlorophyllController/findChlorophyllAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/chlorophyllController/chlorophyllAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/chlorophyllController/findChlorophyllHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/chlorophyllController/chlorophyllHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","chlorophyllId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","chlorophyllAddress"],
        ["timeInterval","intervalTime"],
        ["edomdoTemp","chlorophyllData"],//叶绿素浓度
        ["edomo2Value","temp"],// 温度
        ["tempMaximum","chlorophyllMaxData"],  //叶绿素最大浓度
        ["tempMinimum","chlorophyllMinData"],  //叶绿素最小浓度
        ["humMaximum","maxTemp"], //最大温度
        ["humMinimum","minTemp"], //最小温度
        ["name","chlorophyllName"],
        ["status","chlorophyllStatus"]
    ],
    status:[
        ["id","chlorophyllId"],
        ["edomdoTemp","chlorophyllData"],
        ["edomo2Value","temp"],
        ["status","chlorophyllStatus"]
    ],
    alarm:[
        ["id","chlorophyllId"],
        ["deviceName","chlorophyllName"],
        ["description","info"],
        ["time","chlorophyllAlarmTime"]
    ],
    history:[
        ["id",'chlorophyllId'],
        ['edomdoTemp','chlorophyllData'],
        ['edomo2Value','temp'],
        ['time','chlorophyllHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query