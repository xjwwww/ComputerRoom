import { service } from '../../request/request.js'
import { timeFormatTransform } from '../../util/util.js'

var getDevice = function() {
    return service({
            method: 'get',
            url: '/software/ktr8052/findKtr8052All/2',
        })
        .then(
            data =>
            data.map(element => deviceDecomposition(element))

        )
}

var deviceDecomposition = function({ ekmId, diId, gId, ekmName, gallery, ekmAddress, kId, status }) {
    return {
        deviceId: ekmId,
        channel: gallery,
        address: ekmAddress,
        name: ekmName,
        deviceTypeId: kId,
        ipId: diId,
        groupId: gId,
        status
    }
}

var addDevice = function(object) {
    return service({
        method: 'post',
        url: '/software/ktr8052/insertKtr8052Manage',
        data: deviceInDecomposition(object)
    })
}

var updateDevice = function(object) {
    return service({
        method: 'put',
        url: '/software/ktr8052/updateKtr8052Manage',
        data: deviceInDecomposition(object)
    })
}

var deviceInDecomposition = function({ deviceId, name, address, channel, ipId, deviceTypeId, groupId }) {
    return {
        ekmId: deviceId,
        ekmName: name,
        ekmAddress: address,
        gallery: channel,
        kId: deviceTypeId,
        diId: ipId,
        gId: groupId,
    }
}

var deleteDevice = function(id) {
    return service({
        method: 'delete',
        url: `/software/ktr8052/deleteKtr8052Manage/${id}`,
    })
}

var getDeviceType = function() {
    return service({
            method: 'get',
            url: '/software/ktr8052/findKtr8052Device',
        })
        .then(
            data =>
            data.map(({ kId, kName }) => {
                return {
                    id: kId,
                    name: kName
                }
            })
        )
}

var getIps = function() {
    return service({
            method: 'get',
            url: '/software/ktr8052/find8052DeviceIp'
        })
        .then(
            data =>
            data.map(({ diId, diAddress, diPort }) => { return { id: diId, address: diAddress, port: diPort } })
        )
}

var getDevicesByDeviceTypeId = function(deviceTypeId) {
    return service({
            method: 'get',
            url: `/software/ktr8052/getKtr8052/${deviceTypeId}`,
        })
        .then(
            // (data) => { console.log(data) }
            data => data.map(element => deviceDecomposition(element))
        )
}

var checkStatusByDeviceTypeId = function(deviceTypeId) {
    return service({
            method: 'get',
            url: `/software/ktr8052/getKtr8052Status/${deviceTypeId}`,
        })
        .then(
            data => data.map(({ ekmId, status }) => {
                return {
                    id: ekmId,
                    status
                }
            })
        )
}

var getAlarms = function(deviceId, startTime, endTime) {
    startTime = timeFormatTransform(startTime)
    endTime = timeFormatTransform(endTime)
    return service({
            method: 'get',
            url: `/software/ktr8052/findKtr8052Alarm/${deviceId}/${startTime}/${endTime}`
        })
        .then(
            data => data.map(element => alarmDecomposition(element))
        )
}

function alarmDecomposition({ ekaId, ekmName, ekaTime }) {
    return {
        id: ekaId,
        deviceName: ekmName,
        description: '设备报警',
        time: ekaTime
    }
}

var getAlarmsExcel = function(deviceId, startTime, endTime) {
    startTime = timeFormatTransform(startTime)
    endTime = timeFormatTransform(endTime)
    let url = `/software/ktr8052/alarm8052Excel/${deviceId}/${startTime}/${endTime}`
    window.location.href = url
}

export default {
    getDevice,
    addDevice,
    updateDevice,
    deleteDevice,
    getDeviceType,
    getIps,
    getDevicesByDeviceTypeId,
    checkStatusByDeviceTypeId,
    getAlarms,
    getAlarmsExcel
}