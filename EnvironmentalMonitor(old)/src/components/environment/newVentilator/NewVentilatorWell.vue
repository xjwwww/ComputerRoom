<template>
    <div>
        <component :is="inheritWell" :device="device" :setting="setting"></component>
    </div>
</template>
<script>
import BaseOnOffWriteWell from '../../base/well/baseOnOffWriteWell/BaseOnOffWriteWell.vue'
import icon from './img/main-icon.png'

export default {
    data(){
        return{
            inheritWell:BaseOnOffWriteWell,
            setting:{
                icon:icon,
                color:{
                    active:{
                        left:'rgba(75,220,160,0.9)',
                        right:'rgb(55,222,149)'
                    }
                }
            }
        }
    },
    props:['device','id'],
}
</script>
<style>
    /* @import '../../../css/components/environment/new-ventilator-well.css'; */
</style>