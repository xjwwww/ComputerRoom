<template>
    <div class="ctm-container ctm-container_flex_row">
        <base-group-sidetree :sidetreeOpen.sync="sidetreeOpen" :groups="groups" :selectedDevices.sync="selectedDevices"></base-group-sidetree>
        
        <div class="ctm-content ctm-content__main" :class="[sidetreeOpen?'ctm-content__main_close':'ctm-content__main_open']">
            <div class="well-container">
                <div class="well-container__status-gallery" v-show="alarmDevices.length!==0">
                    <div class="status-gallery__title">设备报警</div>
                    <component :is="deviceWell" :device="item" v-for="item in alarmDevices" :key="item.deviceId"></component>
                </div>
                <div class="well-container__status-gallery" v-show="normalDevices.length!==0">
                    <div class="status-gallery__title">设备开启</div>
                    <component :is="deviceWell" :device="item" v-for="item in normalDevices" :key="item.deviceId"></component>
                </div>
                <div class="well-container__status-gallery" v-show="unConnectedDevices.length!==0">
                    <div class="status-gallery__title">设备关闭</div>
                    <component :is="deviceWell" :device="item" v-for="item in unConnectedDevices" :key="item.deviceId"></component>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'base-device-exhibition',
        data(){
            return {
                showDevice:false,
                sidetreeOpen:true,
                selectedDevices:[],
            }           
        },
        props:['deviceWell','groups'],
        computed:{
            alarmDevices(){
                return this.selectedDevices.filter(item=>item.status==1)
            },
            normalDevices(){
                return this.selectedDevices.filter(item=>item.status==0)
            },
            unConnectedDevices(){
                return this.selectedDevices.filter(item=>item.status==2)
            },
        },
    }
</script>
<style>
    @import '~@/css/page.css';
    @import './base-device-exhibition.css';
</style>