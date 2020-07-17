<template>
    <div class="central-ac-unit-well">
        <div class="central-ac-unit-well__header">
            压缩机输出
        </div>
        <div class="central-ac-unit-well__content">
            <div class="central-ac-unit-well__data" v-for="(status,index) in dataGroup" :key="index">
                <div class="central-ac-unit-well__k">{{index}}#压缩机</div>
                <div class="central-ac-unit-well__v" v-if="status===0">无输出</div>
                <div class="central-ac-unit-well__v_alarm" v-else-if="status===2">输出</div>
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
    @import '../../css/central-ac-unit-well.css';
</style>