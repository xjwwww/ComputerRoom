<template>
    <div class="precision-alarm-status-well">
        <div class="precision-alarm-status-well__title">
            报警状态
        </div>
        <div class="precision-alarm-status-well__content">
            <div class="precision-alarm-status-well__part">
                <div class="alarm-status-row">
                    <div class="alarm-status-row__key" :class="{'alarm-status-row__key_alarm':device.highTempAlarm==1}">高温报警</div>
                    <div class="alarm-status-row__value" v-if="device.highTempAlarm==0">正常</div>
                    <div class="alarm-status-row__value alarm-status-row__value_alarm" v-else>报警</div>
                </div>
                <div class="alarm-status-row">
                    <div class="alarm-status-row__key"  :class="{'alarm-status-row__key_alarm':device.highHumAlarm==1}">高湿报警</div>
                    <div class="alarm-status-row__value" v-if="device.highHumAlarm==0">正常</div>
                    <div class="alarm-status-row__value alarm-status-row__value_alarm" v-else>报警</div>
                </div>
                <div class="alarm-status-row">
                    <div class="alarm-status-row__key"  :class="{'alarm-status-row__key_alarm':device.highPressureAlarm==1}">高压报警</div>
                    <div class="alarm-status-row__value" v-if="device.highPressureAlarm==0">正常</div>
                    <div class="alarm-status-row__value alarm-status-row__value_alarm" v-else>报警</div>
                </div>
                <div class="alarm-status-row">
                    <div class="alarm-status-row__key"  :class="{'alarm-status-row__key_alarm':device.powerFailureAlarm==1}">电源故障报警</div>
                    <div class="alarm-status-row__value" v-if="device.powerFailureAlarm==0">正常</div>
                    <div class="alarm-status-row__value alarm-status-row__value_alarm" v-else>报警</div>
                </div>
                <div class="alarm-status-row">
                    <div class="alarm-status-row__key"  :class="{'alarm-status-row__key_alarm':device.runningStatus==1}">运行状态</div>
                    <div class="alarm-status-row__value" v-if="device.runningStatus==0">正常</div>
                    <div class="alarm-status-row__value alarm-status-row__value_alarm" v-else>报警</div>
                </div>
            </div>
            <div class="precision-alarm-status-well__part">
                <div class="alarm-status-row">
                    <div class="alarm-status-row__key"  :class="{'alarm-status-row__key_alarm':device.lowTempAlarm==1}">低温报警</div>
                    <div class="alarm-status-row__value" v-if="device.lowTempAlarm==0">正常</div>
                    <div class="alarm-status-row__value alarm-status-row__value_alarm" v-else>报警</div>
                </div>
                <div class="alarm-status-row">
                    <div class="alarm-status-row__key"  :class="{'alarm-status-row__key_alarm':device.lowHumAlarm==1}">低湿报警</div>
                    <div class="alarm-status-row__value" v-if="device.lowHumAlarm==0">正常</div>
                    <div class="alarm-status-row__value alarm-status-row__value_alarm" v-else>报警</div>
                </div>
                <div class="alarm-status-row">
                    <div class="alarm-status-row__key"  :class="{'alarm-status-row__key_alarm':device.lowPressureAlarm==1}">低压报警</div>
                    <div class="alarm-status-row__value" v-if="device.lowPressureAlarm==0">正常</div>
                    <div class="alarm-status-row__value alarm-status-row__value_alarm" v-else>报警</div>
                </div>
                <div class="alarm-status-row">
                    <div class="alarm-status-row__key"  :class="{'alarm-status-row__key_alarm':device.hotGasAlarm==1}">热气通阀</div>
                    <div class="alarm-status-row__value" v-if="device.hotGasAlarm==0">正常</div>
                    <div class="alarm-status-row__value alarm-status-row__value_alarm" v-else>报警</div>
                </div>
                <div class="alarm-status-row">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['device'],
}
</script>
<style>
    @import '../css/precision-ac-alarm-status-well.css';
</style>