import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/ammoniaNitrogen/findAmmoniaNitrogenManageAll',
    checkStatus:'/software/ammoniaNitrogen/findAmmoniaNitrogenStatus',
    addDevice:'/software/ammoniaNitrogen/insertAmmoniaNitrogenManage',
    updateDevice:'/software/ammoniaNitrogen/updateAmmoniaNitrogenManage',
    deleteDevice:'/software/ammoniaNitrogen/deleteAmmoniaNitrogenManage/${id}',
    getIps:'/software/ammoniaNitrogen/findAmmoniaNitrogenDeviceIp',
    getAlarms:'/software/ammoniaNitrogen/findAmmoniaNitrogenAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/ammoniaNitrogen/AmmoniaNitrogenAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/ammoniaNitrogen/findAmmoniaNitrogenHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/ammoniaNitrogen/AmmoniaNitrogenHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","ammoniaNitrogenId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","ammoniaNitrogenAddress"],
        ["timeInterval","intervalTime"],
        ["edomdoTemp","ammoniaData"],//氨气
        ["edomo2Value","nitrogenData"],//氮气
        ["tempMaximum","ammoniaMaxData"],
        ["tempMinimum","ammoniaMinData"],
        ["humMaximum","nitrogenMaxData"], //humMaximum
        ["humMinimum","nitrogenMinData"], //humMinimum
        ["name","ammoniaNitrogenName"],
        ["status","ammoniaNitrogenStatus"]
    ],
    status:[
        ["id","ammoniaNitrogenId"],
        ["edomdoTemp","ammoniaData"],
        ["edomo2Value","nitrogenData"],
        ["status","ammoniaNitrogenStatus"]
    ],
    alarm:[
        ["id","ammoniaNitrogenId"],
        ["deviceName","ammoniaNitrogenName"],
        ["description","info"],
        ["time","ammoniaNitrogenAlarmTime"]
    ],
    history:[
        ["id",'ammoniaNitrogenHistoryId'],
        ['edomdoTemp','ammoniaData'],
        ['edomo2Value','nitrogenData'],
        ['time','ammoniaNitrogenHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query