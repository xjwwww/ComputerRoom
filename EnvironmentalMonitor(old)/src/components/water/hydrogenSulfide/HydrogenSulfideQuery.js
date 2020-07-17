import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/hydrogenSulfideController/gethydrogenSulfideManageAll',
    checkStatus:'/software/hydrogenSulfideController/findHydrogenSulfideManageStatus',
    addDevice:'/software/hydrogenSulfideController/insertHydrogenSulfideManage',
    updateDevice:'/software/hydrogenSulfideController/updateHydrogenSulfideManage',
    deleteDevice:'/software/hydrogenSulfideController/deleteHydrogenSulfideManage/${id}',
    getIps:'/software/hydrogenSulfideController/findHydrogenSulfideDeviceIp',
    getAlarms:'/software/hydrogenSulfideController/findHydrogenSulfideAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/hydrogenSulfideController/hydrogenSulfideAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/hydrogenSulfideController/findHydrogenSulfideHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/hydrogenSulfideController/hydrogenSulfideHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","hydrogenSulfideId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","hydrogenSulfideAddress"],
        ["name","hydrogenSulfideName"],
        ["maxValue","hydrogenSulfideMaxData"],
        ["minValue","hydrogenSulfideMinData"],
        ["value","hydrogenSulfideData"],
        ["intervalTime","intervalTime"],
        ["status","hydrogenSulfideStatus"],
    ],
    status:[
        ["id","hydrogenSulfideId"],
        ["status","hydrogenSulfideStatus"],
        ["value","hydrogenSulfideData"],
    ],
    alarm:[
        ["id","hydrogenSulfideId"],
        ["deviceName","hydrogenSulfideName"],
        ["description","info"],
        ["time","hydrogenSulfideAlarmTime"]
    ],
    history:[
        ["id",'hydrogenSulfideHistoryId'],
        ['value','hydrogenSulfideData'],
        ['time','hydrogenSulfideHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query