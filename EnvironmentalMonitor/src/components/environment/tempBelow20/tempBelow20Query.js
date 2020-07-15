var getDevices=function(){
    return Promise.resolve()
    .then(
        ()=>[
            {
                deviceId:1,
                name:'冰柜温度1',
                value:-34,
                groupId:2,
                status:0
            }
        ]
    )
}

export default{
    getDevices,
}