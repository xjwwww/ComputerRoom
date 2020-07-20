import { service } from '../../request/request.js'
import { Message } from 'element-ui'



var changeDeviceStatus = function(status) {
    return service({
            method: 'get',
            url: `/software/ktr8060/openOrCloseFan/${status}`
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
    changeDeviceStatus
}