import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/dissolvedOxygen/findDissolvedOxygenManageAll',
    checkStatus:'/software/dissolvedOxygen/findDissolvedOxygenStatus',
    addDevice:'/software/dissolvedOxygen/insertDissolvedOxygenManage',
    updateDevice:'/software/dissolvedOxygen/updateDissolvedOxygenManage',
    deleteDevice:'/software/dissolvedOxygen/deleteDissolvedOxygenManage/${id}',
    getIps:'/software/dissolvedOxygen/findDissolvedOxygenDeviceIp',
    getAlarms:'/software/dissolvedOxygen/findDissolvedOxygenAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/dissolvedOxygen/DissolvedOxygenAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/dissolvedOxygen/findDissolvedOxygenHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/dissolvedOxygen/dissolvedOxygenHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","edomId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","edomAddress"],
        ["timeInterval","intervalTime"],
        ["edomdoTemp","edomDoTemp"],//温度..原字段temperature
        ["edomo2Value","edomO2Value"],//含氧量  原字段humidity
        ["tempMaximum","edomDoTempMax"],
        ["tempMinimum","edomDoTempMin"],
        ["edomO2Maximum","edomO2MaxValue"], //humMaximum
        ["edomO2Minimum","edomO2MinValue"], //humMinimum
        ["name","edomDeviceName"],
        ["status","edomStatus"]
    ],
    status:[
        ["id","edomId"],
        ["edomdoTemp","edomDoTemp"],
        ["edomo2Value","edomO2Value"],
        ["status","edomStatus"]
    ],
    alarm:[
        ["id","ehaId"],
        ["deviceName","edomDeviceName"],
        ["description","edoaInfo"],
        ["time","edoaTime"]
    ],
    history:[
        ["id",'ehhId'],
        ['edomdoTemp','edohDoTemp'],
        ['edomo2Value','edohO2Value'],
        ['time','edohTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query