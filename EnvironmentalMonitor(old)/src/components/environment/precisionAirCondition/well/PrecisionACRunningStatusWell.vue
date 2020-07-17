<template>
    <div class="precision-running-status-well">
        <div class="running-status-row">
            <div class="running-status-row__key">制冷状态</div>
            <div class="running-status-row__value" v-if="device.refrigerationStatus==1">开启</div>
            <div class="running-status-row__value running-status-row__value_stop" v-else>关闭</div>
        </div>
        <div class="running-status-row">
            <div class="running-status-row__key">除湿状态</div>
            <div class="running-status-row__value" v-if="device.deHumidifyStatus==1">开启</div>
            <div class="running-status-row__value running-status-row__value_stop" v-else>关闭</div>
        </div>
        <div class="running-status-row">
            <div class="running-status-row__key">风机状态</div>
            <div class="running-status-row__value" v-if="device.fanStatus==1">开启</div>
            <div class="running-status-row__value running-status-row__value_stop" v-else>关闭</div>
        </div>
        <div class="running-status-row">
            <div class="running-status-row__key">加湿状态</div>
            <div class="running-status-row__value" v-if="device.humidifyStatus==1">开启</div>
            <div class="running-status-row__value running-status-row__value_stop" v-else>关闭</div>
        </div>
        <div class="running-status-row">
            <div class="running-status-row__key">加热状态</div>
            <div class="running-status-row__value" v-if="device.heatingStatus==1">开启</div>
            <div class="running-status-row__value running-status-row__value_stop" v-else>关闭</div>
        </div>
        <div class="running-status-row">
            <div class="running-status-row__key">压缩机状态</div>
            <div class="running-status-row__value" v-if="device.compressStatus==1">开启</div>
            <div class="running-status-row__value running-status-row__value_stop" v-else>关闭</div>
        </div>
        <div class="running-status-row">
            <div class="running-status-row__key">开关机状态</div>
            <div class="running-status-row__value" v-if="device.pluseStatus==1">开启</div>
            <div class="running-status-row__value running-status-row__value_stop" v-else>关闭</div>
        </div>
    </div>
</template>
<script>
export default {
    props:['device']
}
</script>
<style>
    @import '../css/precision-ac-running-status-well.css';
</style>