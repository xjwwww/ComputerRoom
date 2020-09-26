import { service } from '../../request/request.js'
import { Message } from 'element-ui'
// import { data } from 'jquery'

var getDevice = function() {
    let dId = 3
    return service({
            method: 'get',
            url: `/software/ktr8060/findKtr8060All/${dId}`,
        })
        .then(
            data =>
            data.map(element => deviceDecomposition(element))
        )
}

var deviceDecomposition = function({ id, diId, gId, name, gallery, address, kId, status }) {
    return {
        deviceId: id,
        channel: gallery,
        address,
        name,
        deviceTypeId: kId,
        ipId: diId,
        groupId: gId + 1,
        status,
    }
}

var addDevice = function(object) {
    return service({
        method: 'post',
        url: '/software/ktr8060/insertKtr8060',
        data: deviceInDecomposition(object)
    })
}

var updateDevice = function(object) {
    return service({
        method: 'put',
        url: '/software/ktr8060/updateKtr8060',
        data: deviceInDecomposition(object)
    })
}

var deviceInDecomposition = function({ deviceId, name, address, channel, ipId, deviceTypeId, groupId }) {
    return {
        id: deviceId,
        name,
        address,
        gallery: channel,
        kId: deviceTypeId,
        diId: ipId,
        gId: groupId,
    }
}

var deleteDevice = function(id) {
    return service({
        method: 'delete',
        url: `/software/ktr8060/deleteKtr8060/${id}`,
    })
}

var getDeviceType = function() {
    return service({
            method: 'get',
            url: '/software/ktr8060/selectKtr8060Device',
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
            url: '/software/ktr8060/find8060DeviceIp'
        })
        .then(
            (data) =>
            data.map(({ diId, diAddress, diPort }) => { return { id: diId, address: diAddress, port: diPort } })
        )
}

var getDevicesByDeviceTypeId = function(deviceTypeId) {
        return service({
                method: 'get',
                url: `/software/ktr8060/find8060ByDevice/${deviceTypeId}`
            })
            .then(data => {
                // console.log(data)
                return data.map(element => deviceDecomposition(element))
            })
    }
    // 查询8060设备（ 散热或者门磁）
var getDevicesByDeviceTypeIds = function(kId) {
    return service({
            method: 'get',
            url: `/software/ktr8060/findKtr8060ManageByKid?kId=` + kId,
        })
        .then(data =>
            // data.map(element => deviceDecomposition(element))
            {
                // console.log(data.map(element => deviceDecomposition(element)));
                return data.map(element => deviceDecomposition(element))
            }
        )
}

var changeDeviceStatus = function(id, status) {
    return service({
            method: 'get',
            url: `/software/ktr8060/open8060Equipment/${id}/${status}`
        })
        .then(({ zt }) => {
            return {
                result: zt
            }
        })
        .catch(() => {
            Message.error("连接超时")
            return Promise.reject()
        })
}

export default {
    getDevice,
    addDevice,
    updateDevice,
    deleteDevice,
    getDeviceType,
    getIps,
    getDevicesByDeviceTypeId,
    changeDeviceStatus,
    getDevicesByDeviceTypeIds
}