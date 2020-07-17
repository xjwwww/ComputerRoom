import { service } from '@/js/request/request.js'
import { timeFormatTransform, dataTransform } from '@/js/util/util.js'

const BaseQuery = class {
    constructor(urls, transformFormat) {
            this.urls = urls
            this.transformFormat = transformFormat
        }
        // getDevices(transform) {
        //     return service({
        //             method: 'get',
        //             url: this.urls.getDevices
        //         })
        //         .then(
        //             data => {
        //                 if (transform)
        //                     return data.map(element => transform(element))
        //                         // return data.map(element=>dataTransform(this.transformFormat.device,element))
        //             }
        //         )
        // }
    getDevices(transform) {
        return service({
                method: 'get',
                url: this.urls.getDevices
            })
            .then(
                data => {
                    //console.log(data)
                    if (transform)
                        return data.map(element => transform(element))
                    if (Array.isArray(data)) {

                        return data.map(element => dataTransform(this.transformFormat.device, element))
                    } else {
                        let arr = [];
                        arr.push(data)

                        return arr.map(element => dataTransform(this.transformFormat.status, element))
                    }
                }
            )
    }
    checkStatus(transform) {
        return service({
                method: 'get',
                url: this.urls.checkStatus
            })
            .then(
                data => {
                    // let datas = Array.from(data)
                    console.log(data)
                    if (transform)
                        return data.map(element => transform(element))
                            // return data.map(element => dataTransform(this.transformFormat.status, element))
                }
            )
    }
    addDevice(object, transform) {
        return service({
            method: 'post',
            url: this.urls.addDevice,
            data: transform ? transform(object) : dataTransform(this.transformFormat.device, object, true)
        })
    }
    updateDevice(object, transform) {
        return service({
            method: 'put',
            url: this.urls.updateDevice,
            data: transform ? transform(object) : dataTransform(this.transformFormat.device, object, true)
        })
    }
    deleteDevice(id) {
        let url = this.urls.deleteDevice.replace("${id}", id)
        return service({
            method: 'delete',
            url
        })
    }
    getIps(transform) {
        return service({
                method: 'get',
                url: this.urls.getIps
            })
            .then(
                data => {
                    if (transform)
                        return data.map(element => transform(element))
                    return data.map(element => dataTransform(this.transformFormat.ip, element))
                }
            )
    }
    getAlarms(deviceId, startTime, endTime, transform) {
        startTime = timeFormatTransform(startTime)
        endTime = timeFormatTransform(endTime)
        let url = this.urls.getAlarms.replace("${deviceId}", deviceId).replace("${startTime}", startTime).replace("${endTime}", endTime)
        return service({
                method: 'get',
                url
            })
            .then(
                data => {
                    if (transform)
                        return data.map(element => transform(element))
                    return data.map(element => dataTransform(this.transformFormat.alarm, element))
                }
            )
    }
    getAlarmsExcel(deviceId, startTime, endTime) {
        startTime = timeFormatTransform(startTime)
        endTime = timeFormatTransform(endTime)
        let url = this.urls.getAlarmsExcel.replace("${deviceId}", deviceId).replace("${startTime}", startTime).replace("${endTime}", endTime)
        window.location.href = url
    }
    getHistory(deviceId, startTime, endTime, transform) {
        startTime = timeFormatTransform(startTime)
        endTime = timeFormatTransform(endTime)
        let url = this.urls.getHistory.replace("${deviceId}", deviceId).replace("${startTime}", startTime).replace("${endTime}", endTime)
        return service({
                method: 'get',
                url
            })
            .then(
                data => {
                    if (transform)
                        return data.map(element => transform(element))
                    return data.map(element => dataTransform(this.transformFormat.history, element))
                }
            )
    }
    getHistoryExcel(deviceId, startTime, endTime) {
        startTime = timeFormatTransform(startTime)
        endTime = timeFormatTransform(endTime)
        let url = this.urls.getHistoryExcel.replace("${deviceId}", deviceId).replace("${startTime}", startTime).replace("${endTime}", endTime)
        window.location.href = url
    }
}

export default BaseQuery