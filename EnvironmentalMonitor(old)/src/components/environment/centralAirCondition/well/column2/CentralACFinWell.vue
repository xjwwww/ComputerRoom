<template>
    <div class="central-ac-unit-well">
        <div class="central-ac-unit-well__header">
            翅片温度
        </div>
        <div class="central-ac-unit-well__content">
            <div class="central-ac-unit-well__data" v-for="(temp,index) in dataGroup" :key="index">
                <div class="central-ac-unit-well__k">单元#{{index}}</div>
                <div class="central-ac-unit-well__k">{{temp}}°</div>                
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