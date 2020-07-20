<template>
    <a class="monitor-device" :href="href" @click="navigate">
        <!-- <div class="monitor-device-circle">
            <div class="monitor-device-circle__part monitor-device-cicle__part_left"></div>
            <div class="monitor-device-circle__part monitor-device-cicle__part_right"></div>
            <div class="monitor-device-circle__center"></div>
        </div> -->
        <!-- <div :class="['monitor-device__icon','antiThunder']"> -->
            <!-- <img src="../../img/temperature.png" height="100%"/> -->
        <!-- </div> -->
        <div class="monitor-device__icon">
            <img :src="isActive?activeImgObj:imgObj" height="100%">
        </div>
        <div class="monitor-device__name" :class="isActive && 'monitor-device__name_active'">
            {{device.name}}
        </div>
    </a>
</template>
<script>
export default {
    data(){
        return{
            imgObj:undefined,
            activeImgObj:undefined
        }
    },
    props:['device','isActive','href','navigate'],
    created(){
        this.imgObj=require(`../../img/monitorpage/device/${this.device.key}.png`)
        this.activeImgObj=require(`../../img/monitorpage/device/${this.device.key}-active.png`)
    }
}
</script>
<style>
    @import '../../css/monitorpage/device-item.css';
</style>