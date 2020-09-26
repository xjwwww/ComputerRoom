import BaseQuery from '@/js/query/base/BaseQuery'

const urls = {
    getDevices: '/software/humiture/findHumitureManageAll',
    checkStatus: '/software/humiture/findHumitureStatus',
    addDevice: '/software/humiture/insertHumitureManage',
    updateDevice: '/software/humiture/updateHumitureManage',
    deleteDevice: '/software/humiture/deleteHumitureManageById/${id}',
    getIps: '/software/humiture/findHumitureDeviceIp',
    getAlarms: '/software/humiture/findHumitureAlarm/${deviceId}/${startTime}/${endTime}',
    getAlarmsExcel: '/software/humiture/humitureAlarmExcel/${deviceId}/${startTime}/${endTime}',
    getHistory: '/software/humiture/findHumitureHistory/${deviceId}/${startTime}/${endTime}',
    getHistoryExcel: '/software/humiture/humitureHistoryExcel/${deviceId}/${startTime}/${endTime}'
}

const transformFormat = {
    device: [
        ["deviceId", "ehmId"],
        ["ipId", "diId"],
        ["groupId", "gid"],
        ["address", "ehmDeviceAddress"],
        ["timeInterval", "intervalTime"],
        ["temperature", "ehmTem"],
        ["humidity", "ehmHum"],
        ["tempMaximum", "ehmMaxTem"],
        ["tempMinimum", "ehmMinTem"],
        ["humMaximum", "ehmMaxHum"],
        ["humMinimum", "ehmMinHum"],
        ["functionCode", "ehmDeviceFunction"],
        ["name", "ehmDeviceName"],
        ["status", "ehmStatus"]
    ],
    status: [
        ["id", "ehmId"],
        ["temperature", "ehmTem"],
        ["humidity", "ehmHum"],
        ["status", "ehmStatus"]
    ],
    alarm: [
        ["id", "ehaId"],
        ["deviceName", "ehaName"],
        ["description", "ehaInfo"],
        ["time", "ehaTime"]
    ],
    history: [
        ["id", 'ehhId'],
        ['temperature', 'ehhTem'],
        ['humidity', 'ehhHum'],
        ['time', 'ehhTime']
    ],
    ip: [
        ["id", 'diId'],
        ['address', 'diAddress'],
        ['port', 'diPort']
    ]
}

const query = new BaseQuery(urls, transformFormat)

export default query