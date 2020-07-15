import {service} from '@/js/request/request.js'

var getDevices=function(){
    return service({
        method: 'get',
        url: '/software/electricmeter/findElectricmeterAll',
    })
    .then(
        ()=>[
            {
                deviceId:1,
                name:'电池1',
                groupId:2,
                voltage:5.60,
                resistance:0.51,
                temperature:30,
                status:0
            },
            {
                deviceId:2,
                name:'电池2',
                groupId:2,
                voltage:5.60,
                resistance:0.51,
                temperature:30,
                status:2
            },
            {
                deviceId:3,
                name:'电池3',
                groupId:2,
                voltage:5.60,
                resistance:0.51,
                temperature:30,
                status:0
            },
            {
                deviceId:4,
                name:'电池4',
                groupId:2,
                voltage:5.60,
                resistance:0.51,
                temperature:30,
                status:1
            },
            {
                deviceId:5,
                name:'电池5',
                groupId:2,
                voltage:5.60,
                resistance:0.51,
                temperature:30,
                status:1
            },
        ]
    )
}

export default{
    getDevices
}