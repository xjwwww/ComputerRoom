<template>
    <component :is="inheritWell" :device="device" :setting="setting"></component>
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
                        left:'#FFAB85',
                        right:'#FFA177'
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