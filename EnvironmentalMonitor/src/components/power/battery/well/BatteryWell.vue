<template>
    <div class="battery-well">
        <div class="battery-well__head">{{device.name}}</div>
        <div class="battery-well__subhead">{{device.groupName}}</div>
        <div class="battery-well__content">
            <batter-value-circle :canvasInfo="voltageCanvas" :param="device.voltage"></batter-value-circle>
            <batter-value-circle :canvasInfo="resistanceCanvas" :param="device.resistance"></batter-value-circle>
            <batter-value-circle :canvasInfo="temperatureCanvas" :param="device.temperature"></batter-value-circle>
        </div>
    </div>
</template>
<script>
import BatterValueCircle from'./BatteryValueCircle.vue'
export default {
    data(){
        return{
            voltageCanvas:{
                maximum:550,
                step:1,
                name:'电压',
                digitsNumber:2,
                unit:'V',
                circleStyle:{
                    color:'blue',
                    firstColor:'#05E2FC',
                    lastColor:'#1E94FF'
                }
            },
            resistanceCanvas:{
                maximum:20,
                step:0.01,
                name:'内阻',
                digitsNumber:2,
                unit:'mΩ',
                circleStyle:{
                    color:'yellow',
                    firstColor:'#EBFC00',
                    lastColor:'#F7AA20'
                }
            },
            temperatureCanvas:{
                maximum:150,
                step:0.1,
                name:'温度',
                digitsNumber:1,
                unit:'°C',
                circleStyle:{
                    color:'purple',
                    firstColor:'#6E6BF0',
                    lastColor:'#AC5AD6'
                }
            },
        }
    },
    props:['device'],
    components:{
        'batter-value-circle':BatterValueCircle
    }
}
</script>
<style>
    @import '../css/battery-well.css';
</style>