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
                    // inactive:{
                    //     left:'rgb(100,181,251)',
                    //     right:'rgb(87,175,251)'
                    // },
                    active:{
                        left:'rgb(251,204,79)',
                        right:'rgb(249,196,57)'
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