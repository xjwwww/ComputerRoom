<template>
    <component :is="inheritWell" :device="device" :setting="setting"></component>
</template>
<script>
import BaseOneDataDeviceWell from '../../base/well/baseOneDataDeviceWell/BaseOneDataDeviceWell.vue'
export default {
    data(){
        return{
            setting:{
                deviceUnit:'ppm',
                valueName:'value',
                maximum:100,
                minimum:0,
                step:0.1,
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