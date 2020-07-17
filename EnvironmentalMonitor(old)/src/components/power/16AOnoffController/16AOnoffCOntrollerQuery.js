var getDevices=function(){
    return Promise.resolve()
    .then(
        ()=>[
            {
                deviceId:1,
                name:'开关断路器1',
                groupId:2,
                status:2
            }
        ]
    )
}

export default{
    getDevices,
}