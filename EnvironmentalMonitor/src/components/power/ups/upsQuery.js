// import {service} from '@/js/request/request.js'
// import {timeFormatTransform} from '@/js/util/util.js'
import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/ups/getUPSManageAll',
    checkStatus:'/software/ups/getUPSManageAll',
    addDevice:'/software/ups/insertUPSManage',
    updateDevice:'/software/ups/updateUPSManage',
    deleteDevice:'/software/ups/deleteUPSManage/${id}',
    getIps:'/software/ups/findUPSDeviceIp',
    getAlarms:'/software/ups/findUPSAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/ups/upsAlarmExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","id"],
        ["address","address"],
        ["name","name"],
        ["batteryVoltage","batVol"],
        ["batteryCapacity","batCapacity"],
        ["restTime","resTime"],
        ["batteryCurrent","batCur"],
        ["batteryTemp","batTemp"],
        ["intFrequency","intFrequency"],
        ["bypFrequency","bypFrequency"],
        ["bypActivate","bypActivate"],

        ["upsTemp","intFault"],
        ["upsLoad","bypActivate"],
        ["workStatus","intVolFault"],
        ["upsStatus","upsType"],
        ["converterStatus","batVolLow"],
        ["rectifierStatus","inTest"],

        ["ipId","diId"],
        ["groupId","gId"]
    ],
    status:[
        ["deviceId","id"],

        ["batteryVoltage","batVol"],
        ["batteryCapacity","batCapacity"],
        ["restTime","resTime"],
        ["batteryCurrent","batCur"],
        ["batteryTemp","batTemp"],
        ["intFrequency","intFrequency"],
        ["bypFrequency","bypFrequency"],
        ["bypActivate","bypActivate"],

        ["upsTemp","intFault"],
        ["upsLoad","bypActivate"],
        ["workStatus","intVolFault"],
        ["upsStatus","upsType"],
        ["converterStatus","batVolLow"],
        ["rectifierStatus","inTest"]
    ],
    alarm:[
        ["id","id"],
        ["deviceName","name"],
        ["description","info"],
        ["time","time"]
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query