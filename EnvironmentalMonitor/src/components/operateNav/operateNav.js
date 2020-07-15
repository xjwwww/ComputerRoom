import {service} from '../../request/request.js'

let operate = {

    readData(){
        return service({
            method: 'get',
            url: '/server'
        })
        .then(data => {
            console.log(data)
        })
    }

}

export default operate