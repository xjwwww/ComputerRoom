import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/crac/getCracManageAll',
    checkStatus:'/software/crac/getCracManageAll',
    addDevice:'/software/crac/insertCracManage',
    updateDevice:'/software/crac/updateCracManage',
    deleteDevice:'/software/crac/deleteCracManage/${id}',
    getIps:'/software/crac/findCracDeviceIp',
    getAlarms:'/software/crac/findCracAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/crac/cracAlarmExcel/${deviceId}/${startTime}/${endTime}',
}

const transformFormat={
    device:[
        ["deviceId","ecmId"],
        ["address","ecmDeviceAddress"],
        ["name","ecmDeviceName"],
        ["gallery","gallery"],
        ["temperature","ecmTemp"],
        ["humidity","ecmHum"],

        ["pluseStatus","ecmOnoroffStatus"],
        ["compressStatus","ecmComprStatus"],
        ["fanStatus","ecmFanStatus"],
        ["refrigerationStatus","ecmRefrigerationStatus"],
        ["heatingStatus","ecmHeatingStatus"],
        ["deHumidifyStatus","ecmDehumidifyStatus"],
        ["humidifyStatus","ecmHumidificationStatus"],
        ["runningStatus","ecmRunningStatus"],

        ["highPressureAlarm","ecmHighPressureAlarm"],
        ["lowPressureAlarm","ecmLowPressureAlarm"],
        ["highTempAlarm","ecmHighTempAlarm"],
        ["lowTempAlarm","ecmLowTempAlarm"],
        ["highHumAlarm","ecmHighHumAlarm"],
        ["lowHumAlarm","ecmLowHumAlarm"],
        ["powerFailureAlarm","ecmPowerFailureAlarm"],
        ["hotGasAlarm","ecmHotGasByPassValveAlarm"],

        ["ipId","diId"],
        ["groupId","gId"]
    ],
    status:[
        ["id","ecmId"],
        ["temperature","ecmTemp"],
        ["humidity","ecmHum"],

        ["pluseStatus","ecmOnoroffStatus"],
        ["compressStatus","ecmComprStatus"],
        ["fanStatus","ecmFanStatus"],
        ["refrigerationStatus","ecmRefrigerationStatus"],
        ["heatingStatus","ecmHeatingStatus"],
        ["deHumidifyStatus","ecmDehumidifyStatus"],
        ["humidifyStatus","ecmHumidificationStatus"],
        ["runningStatus","ecmRunningStatus"],

        ["highPressureAlarm","ecmHighPressureAlarm"],
        ["lowPressureAlarm","ecmLowPressureAlarm"],
        ["highTempAlarm","ecmHighTempAlarm"],
        ["lowTempAlarm","ecmLowTempAlarm"],
        ["highHumAlarm","ecmHighHumAlarm"],
        ["lowHumAlarm","ecmLowHumAlarm"],
        ["powerFailureAlarm","ecmPowerFailureAlarm"],
        ["hotGasAlarm","ecmHotGasByPassValveAlarm"]
    ],
    alarm:[
        ["id","ecaId"],
        ["deviceName","ecmDeviceName"],
        ["description","ecaInfo"],
        ["time","ecaTime"]
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query