<template>
    <component :is="inheritWell" :device="device" :setting="setting"></component>
</template>
<script>
import BaseOneDataDeviceWell from '../../base/well/baseOneDataDeviceWell/BaseOneDataDeviceWell.vue'
export default {
    data(){
        return{
            setting:{
                deviceUnit:'mg/L',
                valueName:'value',
                maximum:1000,
                minimum:0,
                step:0.1,
                digits:3,
                dataFontSize:'34px'
            },
            inheritWell:BaseOneDataDeviceWell
        }
    },
    props:['device'],
}
</script>
<style>

</style>