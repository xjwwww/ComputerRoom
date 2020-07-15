<template>
    <div class="ctm-container ctm-container_flex_row">
        <base-group-sidetree :sidetreeOpen.sync="sidetreeOpen" :groups="groups" :selectedDevices.sync="selectedDevices"></base-group-sidetree>

        <div class="ctm-content ctm-content__main" :class="[sidetreeOpen?'ctm-content__main_close':'ctm-content__main_open']">
            <div class="large-well-container">
                <div class="large-well-container__header" v-if="selectedDevices.length!==1">
                    <div class="device-tag" v-for="item in selectedDevices" :key="item.deviceId" @click="checkedDevice=item">
                        {{item.name}}
                    </div>
                </div>
                <div class="large-well-container__content">
                    <component :is="deviceWell" :device="checkedDevice" v-if="checkedDevice"></component>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            showDevice:false,
            sidetreeOpen:true,
            selectedDevices:[],
            checkedDevice:undefined
        }           
    },
    props:['deviceWell','groups'],
    watch:{
        selectedDevices(val){
            this.checkedDevice=val[0]
        }
    },
}
</script>
<style>
    @import '~@/css/page.css';
    @import './base-large-device-exhibition.css';
</style>