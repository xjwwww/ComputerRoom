
// 除了智慧物联网系统外，其它系统仅需要的数据
let needOnlyData = [
    {
        'name': 'agriculture.menu.json',
        'data': [
            {        
                'key': 'environment',
                'devices': [
                    {'key': 'temperatureAndHumidity'},
                    {'key': 'carbonDioxide'},
                    {'key': 'soilmoisture'},
                    {'key': 'wind'},
                    {'key': 'outdoor'},
                    {'key': 'lighte'},
                    {'key': 'phmeter'},
                    {'key': 'unlocatedLeakage'},
                    {'key': 'locatingLeakage'},
                    {'key': 'pointLeakage'},
                    {'key': 'fissionAirCondition'},
                    {'key': 'precisionAirCondition'},
                    {'key': 'newVentilator'},
                    {'key': 'light'},
                    {'key': 'antiThunder'},
                    {'key': 'poisonousGas'},
                    {'key': 'turbidity'},
                    {'key': 'phmeter'},
                    {'key': 'waterTemp'},
                    {'key': 'residualChlor'},
                    {'key': 'video'}
                ]
            }
        ]
    },      
    {
        'name': 'aircondition.menu.json',
        'data': [
            {
                'key': 'environment',
                'devices': [
                    {"key":"centralAirCondition"},            
                    {"key":"fissionAirCondition"},
                    {"key":"precisionAirCondition"}
                ]
            }
        ]
    },
    {
        'name': 'aquaculture.menu.json',
        'data': [
        {
            "key":"water",
            "devices":[
                {"key":"phmeter"},
                {"key":"dissolvedOxygen"},
                {"key":"ammoniaNitrogen"},
                {"key":"nitrite"},  
                {"key":"salinity"},          
                {"key":"turbidity"},            
                {"key":"waterLevel"},            
                {"key":"chlorophyll"},
                {"key":"cyanin"},
                {"key":"video"}
            ]
        }
        ]
    },
    {
        'name': 'archivesRoom.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"temperatureAndHumidity"},
                {"key":"fissionAirCondition"},
                {"key":"unlocatedLeakage"},
                {"key":"newVentilator"},
                {"key":"wet"},
                {"key":"light"},
                {"key":"electricMeter"},
                {"key":"UPS"},
                {"key":"glass"}
            ]
        },
        {
            "key":"security",
            "devices":[
                {"key":"smoke"},
                {"key":"video"},
                {"key":"fire"},
                {"key":"infrared"},
                {"key":"electricDistributor"},
                {"key":"electricSupply"}
            ]
        },
        ]
    },
    {
        'name': 'battery.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"temperatureAndHumidity"},
                {"key":"phmeter"},
                {"key":"residualChlor"},
                {"key":"waterLevel"},
                {"key":"waterFlow"},
                {"key":"carbonDioxide"}
            ]
        },
        {
            "key":"power",
            "devices":[
                {"key":"battery"},
                {"key":"singleBattery"}
            ]
        },
        ]
    },
    {
        'name': 'building.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"temperatureAndHumidity"},
                {"key":"waterFlow"},
                {"key":"windSense"},
                {"key":"waterFlow"},
                {"key":"waterPressure"},
                {"key":"locatingLeakage"},
                {"key":"carbonDioxide"}            
            ]
        },
        ]
    },
    {
        'name': 'cable.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"SMTtemperature"},
                {"key":"patch"},
                {"key":"Fiber"}
            ]
        },
        ]
    },
    {
        'name': 'dynamicEnvironment.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"temperatureAndHumidity"},
                {"key":"unlocatedLeakage"},
                {"key":"locatingLeakage"},
                {"key":"pointLeakage"},
                {"key":"fissionAirCondition"},
                {"key":"precisionAirCondition"},
                {"key":"wet"},
                {"key":"newVentilator"},
                {"key":"light"},
                {"key":"carbonDioxide"},
                {"key":"poisonousGas"},
                {"key":"antiThunder"},
                {"key":"dust"},
                {"key":"noise"}
            ]
        },
        {
            "key":"power",
            "devices":[
                {"name":"电量仪","key":"electricMeter"},
                {"name":"配电监控","key":"electricDistributor"},
                {"name":"市电监控","key":"electricSupply"},
                {"name":"电池监控","key":"battery"},
                {"name":"UPS","key":"UPS"}
            ]
        },
        {
            "key":"security",
            "devices":[
                {"key":"infrared"},
                {"key":"smoke"},
                {"key":"fire"},
                {"key":"glass"},
                {"key":"door"},
                {"key":"video"}
            ]
        },
        ]
    },
    {
        'name': 'electricity.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"temperatureAndHumidity"},
                {"key":"patch"},
                {"key":"transformer"}
            ]
        },
        {
            "key":"power",
            "devices":[
                {"key":"electricMeter"}
            ]
        },
        {
            "key":"security",
            "devices":[
                {"key":"smoke"}
            ]
        },
        ]
    },
    {
        'name': 'fire.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"Surplus"},
                {"key":"temperatureAndHumidity"}
            ]
        },
        {
            "key":"security",
            "devices":[
                {"key":"Electrical"}
            ]
        },
        ]
    },
    {
        'name': 'husbandry.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"waterproof"}, 
                {"key":"temperatureAndHumidity"},
                {"key":"ammoniaNitrogen"},            
                {"key":"hydrogenSulfide"},
                {"key":"poisonousGas"},
                {"key":"carbonDioxide"},
                {"key":"gasPressure"},
                {"key":"illumination"},
                {"key":"wet"}
            ]
        },
        ]
    },
    {
        'name': 'icebox.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"PT100"},
                {"key":"DS18B20"},
                {"key":"tempAbove20"},
                {"key":"tempBelow20"}
            ]
        },
        {
            "key":"power",
            "devices":[
                {"key":"electricSupply"}
            ]
        },
        ]
    },
    {
        'name': 'illumination.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"illumination"}
            ]
        },
        {
            "key":"power",
            "devices":[
                {"key":"UPS"},
                {"key":"16AOnoffCOntroller"}
            ]
        },
        {
            "key":"security",
            "devices":[
                {"key":"infrared"}
            ]
        },
        ]
    },
    {
        'name': 'leakage.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"temperatureAndHumidity"},
                {"key":"unlocatedLeakage"},
                {"key":"locatingLeakage"},
                {"key":"pointLeakage"},
                {"key":"fissionAirCondition"},
                {"key":"precisionAirCondition"},
                {"key":"light"},
                {"key":"carbonDioxide"},
                {"key":"antiThunder"},
                {"key":"poisonousGas"},
                {"key":"turbidity"},
                {"key":"phmeter"},
                {"key":"waterTemp"},
                {"key":"residualChlor"},
                {"key":"waterLevel"},
                {"key":"waterFlow"}
            ]
        },
        ]
    },
    {
        'name': 'noiseDust.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"noise"},
                {"key":"dust"},
                {"key":"wind"},
                {"key":"gasPressure"}
            ]
        },
        ]
    },
    {
        'name': 'sewage.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"Codcr"},
                {"key":"ammoniaNitrogen"},
                {"key":"totalLin"},
                {"key":"waterFlow"},
                {"key":"sewage"},
                {"key":"phmeter"},
                {"key":"video"}            
            ]
        },
        ]
    },
    {
        'name': 'swimool.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"temperatureAndHumidity"},
                {"key":"phmeter"},
                {"key":"residualChlor"},
                {"key":"video"},
                {"key":"turbidity"}
    
            ]
        },
        ]
    },
    {
        'name': 'warehouse.menu.json',
        'data': [
        {
            "key":"environment",
            "devices":[
                {"key":"temperatureAndHumidity"},
                {"key":"Fiber"},
                {"key":"DS18B20"},
                {"key":"phmeter"},
                {"key":"oxygen"},
                {"key":"carbonDioxide"},
                {"key":"video"}
            ]
        },
        ]
    },
    {
        'name': 'waterQuality.menu.json',
        'data': [
        {
            "key":"water",
            "devices":[          
                {"key":"temperatureAndHumidity"},
                {"key":"phmeter"},
                {"key":"residualChlor"},
                {"key":"Orptransm"},
                {"key":"video"},
                {"key":"turbidity"},
                {"key":"Urea"},
                {"key":"Circulator"}
            ]
        },
        ]
    },
    {
        'name': 'werght.menu.json',
        'data': [
            {
                "key":"environment",
                "devices":[
                    {"key":"weight"}
                
                ]
            },
        ]
    },
]

// 系统监控数据
// let systemMonitoring = {
//     "name":"系统监控",
//     "key":"system",
//     "visible":1,
//     "devices":[]
// }  

// 暴露出去的对象
let changeSystemQuery = {
    changeGetMenu(filename, data){
        // console.log(data)

        let that = this;
        // console.log(filename)
        // console.log(data)
        let arr = undefined;
        for(let i = 0; i < needOnlyData.length; i++){

            if(filename == needOnlyData[i].name){
                arr = that.analyze(data, needOnlyData[i].data) 
            }
        }
        // console.log(arr)
        return arr
    },

    // 分析数据，根据路径获取所需的内容
    // data参数是systemQuery传过来的，obj是needOnlyData里的data数组
    analyze(data, obj){
        // console.log(data[4].devices)

        let systemMonitoring = data[4]
        // systemMonitoring.visible = data[4].visible
        // systemMonitoring.devices = data[4].devices

        let arr = []; // 最后返回出去的数据
        let temp = {}; // 临时存储数据，最后push 进 arr

        for(let i = 0; i < obj.length; i++){
            for(let j = 0; j < data.length; j++){
                if(obj[i].key == data[j].key){
                    temp = {
                        'name': data[j].name,
                        'key': data[j].key,
                        'visible': data[j].visible,
                        'devices': []
                    }   

                    for(let m = 0; m < obj[i].devices.length; m++){
                        for(let n = 0; n < data[j].devices.length; n++){
                            if(obj[i].devices[m].key == data[j].devices[n].key){
                                temp.devices.push(data[j].devices[m])
                            }
                        }
                    }

                    arr.push(temp)
                }
            }
        }

        arr.push(systemMonitoring)
        // console.log(arr)

        return arr
    }

}

export default changeSystemQuery