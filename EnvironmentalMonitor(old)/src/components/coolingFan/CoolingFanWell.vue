<template>
    <component :is="inheritWell" :device="device" :setting="setting"></component>
</template>
<script>
import BaseOnOffWriteWell from '../base/well/baseOpenOrCloseFanWell/baseOpenOrCloseFanWells.vue'
import icon from './img/main-icon.png'

export default {
    data(){
        return{
            inheritWell:BaseOnOffWriteWell,
            setting:{
                icon:icon,
                color:{
                    active:{
                        left:'rgb(79,218,206)',
                        right:'rgb(60,218,203)'
                    }
                }
            }
        }
    },
    props:['device'],
}
</script>
<style>

</style>