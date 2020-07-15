<template>
    <component :is="inheritWell" :device="device" :setting="setting"></component>
</template>
<script>
import BaseOnOffReadWell2 from '../../base/well/baseOnOffReadWell/BaseOnOffReadWell2.vue'
import icon from './img/main-icon.png'
import unconnectedIcon from './img/main-icon-unconnected.png'

export default {
    data(){
        return{
            inheritWell:BaseOnOffReadWell2,
            setting:{
                icon:icon,
                unconnectedIcon:unconnectedIcon
            }
        }
    },
    props:['device'],
}
</script>
<style>

</style>