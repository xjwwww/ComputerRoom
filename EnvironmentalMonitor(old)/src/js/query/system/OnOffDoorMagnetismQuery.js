import { service } from '../../request/request.js'
import { Message } from 'element-ui'



var changeDeviceStatus = function(id, status) {
    console.log(status)
    return service({
            method: 'get',
            url: ` /software/ktr8060//open8060Equipment/${id}/${status}`
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