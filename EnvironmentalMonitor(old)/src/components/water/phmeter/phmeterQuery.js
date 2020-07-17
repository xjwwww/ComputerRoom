import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/phmeter/findPHMeterManageAll',
    checkStatus:'/software/phmeter/findPHMeterManageStatus',
    addDevice:'/software/phmeter/insertPHMeterManage',
    updateDevice:'/software/phmeter/updatePHMeterManage',
    deleteDevice:'/software/phmeter/deletePHMeterManage/${id}',
    getIps:'/software/phmeter/findPHMeterDeviceIp',
    getAlarms:'/software/phmeter/findPHMeterAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/phmeter/phMeterAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/phmeter/findPHMeterHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/phmeter/PHMeterHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","ephmId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","ephmAddress"],
        ["name","ephmDeviceName"],
        ["maxValue","ephmPhMax"],
        ["minValue","ephmPhMin"],
        ["value","ephmPhValue"],
        ["intervalTime","intervalTime"],
        ["status","ephmStatus"],
    ],
    status:[
        ["id","ephmId"],
        ["status","ephmStatus"],
        ["value","ephmPhValue"],
    ],
    alarm:[
        ["id","ephaId"],
        ["deviceName","deviceName"],
        ["description","ephaInfo"],
        ["time","ephaTime"]
    ],
    history:[
        ["id",'ephhId'],
        ['value','ephmPhValue'],
        ['time','ephhTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query