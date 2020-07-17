<template>
    <div class="ups-device-status-well">
        <div class="ups-device-status-well__title">
            UPS设备状态
        </div>
        <div class="ups-device-status-content">
            <div class="ups-device-status-row">
                <div class="ups-device-status-row__key">电池电压</div>
                <div class="ups-device-status-row__value">{{device.batteryVoltage}}V</div>
            </div>
             <div class="ups-device-status-row">
                <div class="ups-device-status-row__key">电池电流</div>
                <div class="ups-device-status-row__value">{{device.batteryCurrent}}A</div>
            </div>
             <div class="ups-device-status-row">
                <div class="ups-device-status-row__key">电池温度</div>
                <div class="ups-device-status-row__value">{{device.batteryTemp}}°C</div>
            </div>
             <div class="ups-device-status-row">
                <div class="ups-device-status-row__key">剩余容量</div>
                <div class="ups-device-status-row__value">{{device.batteryCapacity}}%</div>
            </div>
             <div class="ups-device-status-row">
                <div class="ups-device-status-row__key">剩余时间</div>
                <div class="ups-device-status-row__value">{{device.restTime}}分钟</div>
            </div>
             <div class="ups-device-status-row">
                <div class="ups-device-status-row__key">输入频率</div>
                <div class="ups-device-status-row__value">{{device.intFrequency}}Hz</div>
            </div>
             <div class="ups-device-status-row">
                <div class="ups-device-status-row__key">旁路频率</div>
                <div class="ups-device-status-row__value">{{device.bypFrequency}}Hz</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['device']
}
</script>
<style>
    @import '../css/ups-device-status-well.css';
</style>