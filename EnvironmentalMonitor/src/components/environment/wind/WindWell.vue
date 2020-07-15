<template>
    <component :is="inheritWell" :device="device" :setting="setting"></component>
</template>
<script>
import BaseOneDataDeviceWell from '../../base/well/baseOneDataDeviceWell/BaseOneDataDeviceWell.vue'
export default {
    data(){
        return{
            setting:{
                deviceUnit:'',
                valueName:'value',
                maximum:20,
                minimum:0,
                step:0.01,
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