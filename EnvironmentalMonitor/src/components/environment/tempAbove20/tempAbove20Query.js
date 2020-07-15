var getDevices=function(){
    return Promise.resolve()
    .then(
        ()=>[
            {
                deviceId:1,
                name:'冰柜温度2',
                value:-11,
                groupId:2,
                status:0
            }
        ]
    )
}

export default{
    getDevices,
}