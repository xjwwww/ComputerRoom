import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/muddyController/getMuddyManageAll',
    checkStatus:'/software/muddyController/findMuddyManageStatus',
    addDevice:'/software/muddyController/insertMuddyManage',
    updateDevice:'/software/muddyController/updateMuddyManage',
    deleteDevice:'/software/muddyController/deleteMuddyManage/${id}',
    getIps:'/software/muddyController/findMuddyDeviceIp',
    getAlarms:'/software/muddyController/findMuddyAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/muddyController/muddyAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/muddyController/findMuddyHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/muddyController/muddyHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","muddyId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","muddyAddress"],
        ["name","muddyName"],
        ["maxValue","muddyMaxData"],
        ["minValue","muddyMinData"],
        ["value","muddyData"],
        ["intervalTime","intervalTime"],
        ["status","muddyStatus"],
    ],
    status:[
        ["id","muddyId"],
        ["status","muddyStatus"],
        ["value","muddyData"],
    ],
    alarm:[
        ["id","muddyAlarmId"],
        ["deviceName","muddyName"],
        ["description","info"],
        ["time","muddyAlarmTime"]
    ],
    history:[
        ["id",'muddyHistoryId'],
        ['value','muddyData'],
        ['time','muddyHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query