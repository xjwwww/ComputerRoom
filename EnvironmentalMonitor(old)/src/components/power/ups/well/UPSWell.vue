<template>
    <div class="ups-well">
        <div class="ups-well__head">{{device.name}}</div>
        <div class="ups-well__subhead">{{device.groupName}}</div>
        <div class="ups-well__content">
            <ups-work-status :device="device"></ups-work-status>
            <ups-device-status :device="device"></ups-device-status>
        </div>
    </div>
</template>
<script>
import UPSWorkStatusWell from './UPSWorkStatusWell.vue'
import UPSDeviceStatusWell from './UPSDeviceStatusWell.vue'
export default {
    props:['device'],
    components:{
        'ups-work-status':UPSWorkStatusWell,
        'ups-device-status':UPSDeviceStatusWell
    }
}
</script>
<style>
    @import '../css/ups-well.css';
</style>