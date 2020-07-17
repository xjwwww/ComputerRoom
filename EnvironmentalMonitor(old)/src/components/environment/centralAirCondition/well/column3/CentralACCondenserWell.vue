<template>
    <div class="central-ac-device-well">
        <div class="central-ac-device-well__header">
            冷凝风机
        </div>
        <div class="central-ac-device-well__content">
            <div class="central-ac-device-well__data" v-for="(status,index) in dataGroup" :key="index">
                <div class="central-ac-device-well__k">{{index}}#冷凝风机输出</div>
                <div class="central-ac-device-well__status" v-if="status===0">输出</div>
                <div class="central-ac-device-well__status_alarm" v-else-if="status===2">无输出</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["dataGroup"]
}    
</script>
<style>
    @import '../../css/central-ac-device-well.css';
</style>