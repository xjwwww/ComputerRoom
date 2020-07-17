<template>
    <div class="central-ac-device-well">
        <div class="central-ac-device-well__header">
            单元出水温度
        </div>
        <div class="central-ac-device-well__content">
            <div class="central-ac-device-well__data" v-for="(temp,index) in dataGroup" :key="index">
                <div class="central-ac-device-well__k">出水温度{{index}}</div>
                <div class="central-ac-device-well__v">{{temp}}°</div>
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