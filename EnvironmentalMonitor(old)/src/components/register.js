const register = {
    // environment 环境监控
    //温湿度
    temperatureAndHumidity: () =>
        import ('./environment/temperatureAndHumidity/TemperatureAndHumidity.vue'),
    //非定位漏水
    unlocatedLeakage: () =>
        import ('./environment/unlocatedLeakage/UnlocatedLeakage.vue'),
    //定位漏水
    locatingLeakage: () =>
        import ('./environment/locatingLeakage/LocatingLeakage.vue'),
    //点式漏水
    pointLeakage: () =>
        import ('./environment/pointLeakage/PointLeakage.vue'),
    //分体空调
    fissionAirCondition: () =>
        import ('./environment/fissionAirCondition/FissionAirCondition.vue'),
    //精密空调
    precisionAirCondition: () =>
        import ('./environment/precisionAirCondition/PrecisionAirCondition.vue'),
    //新风机
    newVentilator: () =>
        import ('./environment/newVentilator/NewVentilator.vue'),
    //抽湿加湿
    wet: () =>
        import ('./environment/wet/Wet.vue'),
    //灯光照明
    light: () =>
        import ('./environment/light/Light.vue'),
    //二氧化碳
    carbonDioxide: () =>
        import ('./environment/carbonDioxide/CarbonDioxide.vue'),
    //有毒气体
    poisonousGas: () =>
        import ('./environment/poisonousGas/PoisonousGas.vue'),
    //防雷
    antiThunder: () =>
        import ('./environment/antiThunder/AntiThunder.vue'),
    //粉尘
    dust: () =>
        import ('./environment/dust/Dust.vue'),
    //噪声
    noise: () =>
        import ('./environment/noise/Noise.vue'),
    //中央空调
    centralAirCondition: () =>
        import ('./environment/centralAirCondition/CentralAirCondition.vue'),
    //氧化还原电位计
    potentionmeter: () =>
        import ('./environment/potentionmeter/Potentionmeter.vue'),
    //冷藏库
    PT100: () =>
        import ('./environment/PT100/PT100.vue'),
    //DS18B20
    DS18B20: () =>
        import ('./environment/DS18B20/DS18B20.vue'),
    //气压强度
    gasPressure: () =>
        import ('./environment/gasPressure/GasPressure.vue'),
    //光照强度
    lighte: () =>
        import ('./environment/lighte/Lighte.vue'),
    //贴片式温度
    SMTtemperature: () =>
        import ('./environment/SMTtemperature/SMTTemperature.vue'),
    //光纤电缆测温
    Fiber: () =>
        import ('./environment/Fiber/Fiber.vue'),
    //称重传感器
    weight: () =>
        import ('./environment/weight/Weight.vue'),
    //照度传感器
    illumination: () =>
        import ('./environment/illumination/Illumination.vue'),
    //剩余电流电气火灾
    Surplus: () =>
        import ('./environment/Surplus/Surplus.vue'),
    //负20度以上冰柜
    tempAbove20: () =>
        import ('./environment/tempAbove20/TempAbove20.vue'),
    //负20度以下冰柜
    tempBelow20: () =>
        import ('./environment/tempBelow20/TempBelow20.vue'),
    //风速风向传感器
    wind: () =>
        import ('./environment/wind/Wind.vue'),
    //变压器温控器
    transformer: () =>
        import ('./environment/transformer/transformer.vue'),
    //风管温度传感器
    windSense: () =>
        import ('./environment/windSense/windSense.vue'),
    //电缆贴片温度探头
    patch: () =>
        import ('./environment/patch/patch.vue'),
    //土壤水分温度
    soilmoisture: () =>
        import ('./environment/soilmoisture/soilmoisture.vue'),
    //室外防水温湿度变送器
    waterproof: () =>
        import ('./environment/waterproof/waterproof.vue'),
    //室外温度变送器
    outdoor: () =>
        import ('./environment/outdoor/outdoor.vue'),
    // power动力监控
    //电量仪
    electricMeter: () =>
        import ('./power/electricMeter/ElectricMeter.vue'),
    //配电监控
    electricDistributor: () =>
        import ('./power/electricDistributor/ElectricDistributor.vue'),
    //市电监控
    electricSupply: () =>
        import ('./power/electricSupply/ElectricSupply.vue'),
    //电池监控
    battery: () =>
        import ('./power/battery/Battery.vue'),
    //UPS
    UPS: () =>
        import ('./power/ups/UPS.vue'),
    //单体蓄电池
    singleBattery: () =>
        import ('./power/singleBattery/SingleBattery.vue'),
    //16开关断路器
    '16AOnoffCOntroller': () =>
        import ('./power/16AOnoffCOntroller/16AOnoffCOntroller.vue'),
    //发动机监控
    generator: () =>
        import ('./power/generator/Generator.vue'),
    // security安防监控
    //红外监控
    infrared: () =>
        import ('./security/infrared/Infrared.vue'),
    //烟感监控
    smoke: () =>
        import ('./security/smoke/Smoke.vue'),
    //消防监控
    fire: () =>
        import ('./security/fire/Fire.vue'),
    //消防监控
    glass: () =>
        import ('./security/glass/Glass.vue'),
    //门磁监控
    door: () =>
        import ('./security/door/Door.vue'),
    //视频监控
    video: () =>
        import ('./security/video/Video.vue'),
    //电缆监控
    Cable: () =>
        import ('./security/Cable/Cable.vue'),
    //电气火灾
    Electrical: () =>
        import ('./security/Electrical/Electrical.vue'),

    // water水质监控
    // 氨气
    ammonia: () =>
        import ('./water/ammonia/Ammonia.vue'),
    //余氯
    residualChlor: () =>
        import ('./water/residualChlor/ResidualChlor.vue'),
    //浑浊度
    turbidity: () =>
        import ('./water/turbidity/Turbidity.vue'),
    //水位
    waterLevel: () =>
        import ('./water/waterLevel/WaterLevel.vue'),
    //溶氧仪
    dissolvedOxygen: () =>
        import ('./water/dissolvedOxygen/dissolvedOxygen.vue'),
    //水温
    waterTemp: () =>
        import ('./water/waterTemp/waterTemp.vue'),
    //"水流量
    waterFlow: () =>
        import ('./water/waterFlow/WaterFlow.vue'),
    //酸碱仪
    phmeter: () =>
        import ('./water/phmeter/Phmeter.vue'),
    //污水流量
    salinity: () =>
        import ('./water/salinity/Salinity.vue'),
    //氢化硫化物
    hydrogenSulfide: () =>
        import ('./water/hydrogenSulfide/HydrogenSulfide.vue'),
    //氨氮
    ammoniaNitrogen: () =>
        import ('./water/ammoniaNitrogen/AmmoniaNitrogen.vue'),
    //亚硝酸盐
    nitrite: () =>
        import ('./water/nitrite/nitrite.vue'),
    //电导
    conductance: () =>
        import ('./water/conductance/Conductance.vue'),
    //蓝藻素
    cyanin: () =>
        import ('./water/cyanin/cyanin.vue'),
    //叶绿素
    chlorophyll: () =>
        import ('./water/chlorophyll/chlorophyll.vue'),
    //污水流量
    sewage: () =>
        import ('./water/sewage/sewage.vue'),
    //总磷水质
    totalLin: () =>
        import ('./water/totalLin/TotalLin.vue'),
    //Codcr分析
    Codcr: () =>
        import ('./water/Codcr/Codcr.vue'),
    //ORP变送器
    Orptransm: () =>
        import ('./water/Orptransm/Orptransm.vue'),
    //流通池
    Circulator: () =>
        import ('./water/Circulator/Circulator.vue'),
    //水压力传感器
    waterPressure: () =>
        import ('./water/waterPressure/waterPressure.vue'),
    //氧气变送器
    oxygen: () =>
        import ('./water/oxygen/oxygen.vue'),
    //尿素变送器
    Urea: () =>
        import ('./water/Urea/Urea.vue'),
    // system系统监控
    //日志管理
    journal: () =>
        import ('./system/journal/Journal.vue'),
    //设备管理
    device: () =>
        import ('./system/device/Device.vue'),
    //用户管理
    administrator: () =>
        import ('./system/administrator/Administrator.vue'),
    //资产管理
    property: () =>
        import ('./system/property/Property.vue'),
    // 服务器
    server: () =>
        import ('./system/server/Server.vue'),
    // 天窗门磁
    gatemagnetism: () =>
        import ('./skylight/GateMagnetism.vue'),
}

export default register