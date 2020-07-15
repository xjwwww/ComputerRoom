
import BaseQuery from '@/js/query/base/BaseQuery'

const urls={
    getDevices:'/software/alternatorController/getAlternatorManageAll',
    checkStatus:'/software/alternatorController/findAlternatorManageStatus',
    addDevice:'/software/alternatorController/insertAlternatorManage',
    updateDevice:'/software/alternatorController/updateAlternatorManage',
    deleteDevice:'/software/alternatorController/deleteAlternatorManage/${id}',
    getIps:'/software/alternatorController/findAlternatorDeviceIp',
    getAlarms:'/software/alternatorController/findAlternatorAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel:'/software/alternatorController/alternatorAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory:'/software/alternatorController/findAlternatorHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel:'/software/alternatorController/alternatorHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat={
    device:[
        ["deviceId","alternatorId"],
        ["ipId","diId"],
        ["groupId","gId"],
        ["address","alternatorAddress"],
        ["intervalTime","intervalTime"],

        ["Acurrent","alternatorAcur"],
        ["Bcurrent","alternatorBcur"],
        ["Ccurrent","alternatorCcur"],
        ["Avoltage","alternatorAvol"],
        ["Bvoltage","alternatorBvol"],
        ["Cvoltage","alternatorCvol"],

        ["AMaxcurrent","alternatorMaxAcur"],
        ["AMincurrent","alternatorMinAcur"],
        ["BMaxcurrent","alternatorMaxBcur"],
        ["BMincurrent","alternatorMinBcur"],
        ["CMaxcurrent","alternatorMaxCcur"],
        ["CMincurrent","alternatorMinCcur"],

        ["AMaxvoltage","alternatorMaxAvol"],
        ["AMinvoltage","alternatorMinAvol"],
        ["BMaxvoltage","alternatorMaxBvol"],
        ["BMinvoltage","alternatorMinBvol"],
        ["CMaxvoltage","alternatorMaxCvol"],
        ["CMinvoltage","alternatorMinCvol"],

        ["name","alternatorName"],
        ["status","alternatorStatus"]
    ],
    status:[
        ["deviceId","alternatorId"],
        ["Acurrent","alternatorAcur"],
        ["Bcurrent","alternatorBcur"],
        ["Ccurrent","alternatorCcur"],
        ["Avoltage","alternatorAvol"],
        ["Bvoltage","alternatorBvol"],
        ["Cvoltage","alternatorCvol"],
        ["status","alternatorStatus"]
    ],
    alarm:[
        ["id","alternatorId"],
        ["deviceName","alternatorName"],
        ["description","info"],
        ["time","alternatorAlarmTime"]
    ],
    history:[
        ["id",'alternatorId'],
        ["Acurrent","alternatorAcur"],
        ["Bcurrent","alternatorBcur"],
        ["Ccurrent","alternatorCcur"],
        ["Avoltage","alternatorAvol"],
        ["Bvoltage","alternatorBvol"],
        ["Cvoltage","alternatorCvol"],
        ['time','alternatorHistoryTime']
    ],
    ip:[
        ["id",'diId'],
        ['address','diAddress'],
        ['port','diPort']
    ]
}

const query=new BaseQuery(urls,transformFormat)

export default query