<template>
    <!-- ktr8052设备 -->
    <div class="on-off-read-well">
        <div class="on-off-read-well__content">
            <div :class="['on-off-read-well__ripple',{'on-off-read-well__ripple_status_alarm':device.status==1,'on-off-read-well__ripple_status_unconnected':device.status==2}]"></div>
            <div :class="['on-off-read-well__round',{'on-off-read-well__round_status_alarm':device.status==1,'on-off-read-well__round_unconnected':device.status==2}]">
                <img :src="device.status===2?setting.unconnectedIcon:setting.icon" alt="" class="on-off-read-well__icon">
                <div class="on-off-read-well__device-name" :class="{'on-off-read-well__device-name_unconnected':device.status==2}">{{device.name}}</div>
            </div>
        </div>
        
        <div class="on-off-read-well__footer">
            {{device.groupName}}
        </div>
    </div>
</template>
<script>
export default {
    props:['device','setting']
}
</script>
<style>
    @import './on-off-read-well.css';
</style>