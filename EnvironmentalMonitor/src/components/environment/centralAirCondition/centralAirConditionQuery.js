var getDevices=function(){
    return Promise.resolve([{
        id:1,
        name:"中央空调1",
        bigGroupData:{ 
            outputWaterTemp:12,
            inputWaterTemp:0,
            environmentTemp:0,
            actualTemp:0,
            tempSetValue:0,
            breakDownNumber:0,
            compressorNumber:0,
            loadOutput:0
        },
        bigGroupStatus:{
            systemStatus:2,
            workMode:0,
            comunication:0,
            externalChain:0,
            acPump:0,
            outputWaterTempLow:0,
            outputWaterTempHigh:0,
            inputWaterProbe:1,
            outputWaterProbe:1,
            tempProbe:0
        },
        compressors:[2,0,0,0],
        finTemp:[0,0,0,0],
        unitOutputWaterTemp:[0,0],
        unitPress:[2,2,0,2],
        pressWorkTime:[0,0,0,0],
        condensers:[0,2],
        groupId:2
    }]
    )
}

export default{
    getDevices,
}