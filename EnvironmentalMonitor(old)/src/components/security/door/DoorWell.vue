<template>
    <component :is="inheritWell" :device="device" :setting="setting"></component>
</template>
<script>
import BaseOnOffReadWell from '../../base/well/baseOnOffReadWell/BaseOnOffReadWell.vue'
import icon from './img/door.png'
import unconnectedIcon from './img/door1.png'

export default {
    data(){
        return{
            inheritWell:BaseOnOffReadWell,
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