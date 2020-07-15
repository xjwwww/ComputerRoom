// import BaseQuery from '@/js/query/base/BaseQuery'
import {service} from '@/js/request/request.js'

class baseQuery {
    constructor(urls){
        this.urls = urls
    }

    getDevices(){
        return service({
            method: 'get',
            url: this.urls.getDevices
        })
        .then(data => {
            // console.log(data)
            return data
        })
        .catch(err => {
            console.log(err)
        })
    }
}

const urls = {
    getDevices: '/software/humiture/getAvgTemperature'
}

let HomepageQuery = new baseQuery(urls)

export default HomepageQuery