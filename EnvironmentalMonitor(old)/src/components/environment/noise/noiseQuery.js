import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/noise/selectNoiseManageAll',
    checkStatus:'/software/noise/selectNoiseManageStatus',
    addDevice:'/software/noise/insertNoiseManage',
    updateDevice:'/software/noise/updateNoiseManage',
    deleteDevice:'/software/noise/deleteNoiseManage/${id}',
    getIps:'/software/noise/findNoiseDeviceIp',
    getAlarms:'/software/noise/findNoiseAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/noise/noiseHistoryExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/noise/findNoiseHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/noise/noiseHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","enmId"],
        ["address","noiseAddress"],
        ["name","noiseName"],
        ["value","noiseData"],
        ["noiseMaximum","maxNoise"],
        ["noiseMinimum","minNoise"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["status","status"],
        ["intervalTime","intervalTime"]
    ],
    status:[
        ["id","enmId"],
        ["value","noiseData"],
        ["status","status"]
    ],
    alarm:[
        ["id","enaId"],
        ["deviceName","noiseName"],
        ["description","info"],
        ["time","time"]
    ],
    history:[
        ["id",'enhId'],
        ['temperature','enhNoise'],
        ['time','enhTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query