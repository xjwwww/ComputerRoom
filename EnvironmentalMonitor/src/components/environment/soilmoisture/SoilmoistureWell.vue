<template>
    <component :is="inheritWell" :device="device" :setting="setting"></component>
</template>
<script>
import BaseTwoDataDeviceWell from '../../base/well/baseTwoDataDeviceWell/BaseTwoDataDeviceWell.vue'
import icon from './img/main-icon.png'
import alarmIcon from './img/main-icon-alarm.png'

export default {
    data(){
        return{
            inheritWell:BaseTwoDataDeviceWell,
            setting:{
                icon,
                alarmIcon,
                circle1:{
                    name:"水分",
                    unit:"%",
                    color:'rgb(247,148,74)',
                    step:0.1,
                    maximum:100,
                    minimum:0,
                    digits:2,
                    valueName:"temperature",
                    maxName:"tempMaximum",
                    minName:"tempMinimum"
                },
                circle2:{
                    name:"温度",
                    unit:"℃",
                    color:'rgb(13,165,248)',
                    step:0.1,
                    maximum:100,
                    minimum:0,
                    digits:2,
                    valueName:"humidity",
                    maxName:"humMaximum",
                    minName:"humMinimum"
                },
            }
        }
    },
    props:['device']
}
</script>
<style>

</style>