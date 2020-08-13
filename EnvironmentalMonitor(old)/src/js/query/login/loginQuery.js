import { service } from '../../request/request.js'
import qs from 'qs'

const login = function(username, password) {
    return service({
            method: 'post',
            url: '/software/login',
            data: qs.stringify({ username, password })
        })
        .then(
            ({ zt }) => zt
        )
}

export default {
    login
}