<template>
    <div class="ctm-container ctm-container_flex_row">
        <base-group-sidetree :sidetreeOpen.sync="sidetreeOpen" :groups="groups" :selectedDevices.sync="selectedDevices"></base-group-sidetree>

        <div class="ctm-content ctm-content__main" :class="[sidetreeOpen?'ctm-content__main_close':'ctm-content__main_open']">
            <div class="middle-well-container">
                <div class="middle-well-container__content">
                    <component :is="deviceWell" :device="item" v-for="item in selectedDevices" :key="item.name"></component>
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
        }           
    },
    props:['deviceWell','groups'],
}
</script>
<style>
    @import '~@/css/page.css';
    @import './base-middle-device-exhibition.css';
</style>