var getDevices=function(){
    return Promise.resolve()
    .then(
        ()=>[
            {
                deviceId:1,
                name:'氧化还原电位计1',
                value:100,
                groupId:2,
                status:0
            }
        ]
    )
}

export default{
    getDevices,
}