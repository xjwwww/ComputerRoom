<template>
    <a class="monitor-device" :href="href" @click="navigate" v-if="device.visible==1?true:false">
        
        <div class="monitor-device__icon">
            <img :src="isActive?activeImgObj:imgObj" height="100%" >
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