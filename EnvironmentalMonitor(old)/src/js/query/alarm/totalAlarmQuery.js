import { service } from '@/js/request/request.js'

const getTotalAlarmLimit = function() {
    return service({
            method: 'get',
            url: '/software/totalAlarm/getTotalAlarmLimit'
        })
        .then(data => {
            return data.map(element => alarmDecomposition(element))
        })
}

const alarmDecomposition = function({ id, alarmName, time, isRead }) {
    return {
        id,
        deviceName: alarmName,
        time,
        isRead,
        description: ''
    }
}

const updateIsRead = function(id) {
    return service({
        method: 'put',
        url: `/software/totalAlarm/updateIsRead/${id}`
    })
}

const queryAlarmNumber = function(isRead) {
    return service({
        method: 'get',
        url: `/software/totalAlarm/selectAlarmNumber/${isRead}`
    })
}

const getTotalAlarmByTime = function(t1, t2) {
    return service({
            method: 'get',
            url: `/software/totalAlarm/getTotalAlarmTime/${t1}/${t2}`
        })
        .then(data => {
            return data.map(element => alarmDecomposition(element))
        })
}

const getTotalAlarmExcelByTime = function(t1, t2) {
    let url = `/software/totalAlarm/totalAlarmExcel/${t1}/${t2}`
    console.log(url)
    window.location.href = url
}

const getTotalAlarmAll = function(isRead) {
    return service({
            method: 'get',
            url: `/software/totalAlarm/getTotalAlarmAll/${isRead}`
        })
        .then(data => {
            return data.map(element => alarmDecomposition(element))
        })
}

const getAlarmNumberToday = function() {
    return service({
        method: 'get',
        url: '/software/totalAlarm/getTotalAlarmTodayCount'
    })
}

const getAlarmNumberWeek = function() {
    return service({
        method: 'get',
        url: '/software/totalAlarm/getTotalAlarmWeekCount'
    })
}

const getAlarmNumberMonth = function() {
    return service({
        method: 'get',
        url: '/software/totalAlarm/getTotalAlarmMonthCount'
    })
}

// 通讯地址总数请求接口
const getEquipmentTotal = function() {
    return service({
            method: 'get',
            url: '/software/totalAlarm/getEquipmentTotal'
        })
        .then(data => {
            // console.log(data)
            return data
        })
        .catch(err => {
            console.log(err)
        })
}

export default {
    getTotalAlarmLimit,
    updateIsRead,
    queryAlarmNumber,
    getTotalAlarmByTime,
    getTotalAlarmExcelByTime,
    getTotalAlarmAll,
    getAlarmNumberToday,
    getAlarmNumberWeek,
    getAlarmNumberMonth,
    getEquipmentTotal
}