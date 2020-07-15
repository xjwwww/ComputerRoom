<template>
    <div class="precision-condition-well">
        <div class="precision-condition-well__head">{{device.name}}</div>
        <div class="precision-condition-well__subhead">{{device.groupName}}</div>
        <div class="precision-condition-well__content">
            <precision-ac-humiture :temperature="device.temperature" :humidity="device.humidity" :status="device.status"></precision-ac-humiture>
            <precision-ac-running-status :device="device"></precision-ac-running-status>
            <precision-ac-alarm-status :device="device"></precision-ac-alarm-status>
        </div>
    </div>
</template>
<script>
import PrecisionACHumitureWell from './PrecisionACHumitureWell.vue'
import PrecisionACRunningStatusWell from './PrecisionACRunningStatusWell.vue'
import PrecisionACAlarmStatusWell from './PrecisionACAlarmStatusWell.vue'
export default {
    props:['device'],
    components:{
        'precision-ac-humiture':PrecisionACHumitureWell,
        'precision-ac-running-status':PrecisionACRunningStatusWell,
        'precision-ac-alarm-status':PrecisionACAlarmStatusWell
    },
    mounted(){
        console.log(this.device)
    }
}

</script>
<style>
    @import '../css/precision-air-condition-well.css';
</style>