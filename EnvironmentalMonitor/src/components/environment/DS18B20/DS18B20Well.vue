<template>
    <component :is="inheritWell" :device="device" :setting="setting"></component>
</template>
<script>
import BaseOneDataDeviceWell from '../../base/well/baseOneDataDeviceWell/BaseOneDataDeviceWell.vue'
export default {
    data(){
        return{
            setting:{
                deviceUnit:'°C',
                valueName:'temperature',
                maximum:40,
                minimum:-100,
                step:0.2,
                digits:2
            },
            inheritWell:BaseOneDataDeviceWell
        }
    },
    props:['device'],
}
</script>
<style>
    
</style>