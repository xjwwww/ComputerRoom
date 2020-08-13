import { service } from '@/js/request/request.js'

const getAccount = function() {
    return service({
            method: 'get',
            // 如果在 ie 浏览器监控视频播放不了，把 /80 去掉看看
            url: '/software/video/findVideoManageAll',
        })
        .then(data => {
            return data.map(element => accountDecomposition(element))[0]
        })
}

const accountDecomposition = function({ vId, ipAddress, ipPort, username, password }) {
    return {
        id: vId,
        szIP: ipAddress,
        szPort: ipPort,
        szUsername: username,
        szPassword: password
    }
}

const updateAccount = function(obj) {
    return service({
        method: 'put',
        url: '/software/video/updateVideoManage',
        data: accountInDecomposition(obj)
    })
}

const accountInDecomposition = function({ id, szIP, szPort, szUsername, szPassword }) {
    return {
        vId: id,
        ipAddress: szIP,
        ipPort: szPort,
        username: szUsername,
        password: szPassword
    }
}

export default {
    getAccount,
    updateAccount
}