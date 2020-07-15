<template>
    <div class="central-ac-data-well" style="flex:4;">
        <div class="central-ac-data-well__column">
            <div class="central-ac-data">
                <div class="central-ac-data__kv">出水温度</div>
                <div class="central-ac-data__kv">{{dataGroup.outputWaterTemp}}°C</div>        
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">回水温度</div>
                <div class="central-ac-data__kv">{{dataGroup.inputWaterTemp}}°C</div>
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">环境温度</div>            
                <div class="central-ac-data__kv">{{dataGroup.environmentTemp}}°C</div>
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">实际温度显示</div>
                <div class="central-ac-data__kv">{{dataGroup.actualTemp}}°C</div>
            </div>
        </div>
        <div class="central-ac-data-well__divide"></div>
        <div class="central-ac-data-well__column">
            <div class="central-ac-data">            
                <div class="central-ac-data__kv">温度设定值</div>
                <div class="central-ac-data__kv">{{dataGroup.tempSetValue}}°C</div>        
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">故障数量</div>
                <div class="central-ac-data__kv">{{dataGroup.breakDownNumber}}</div>
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">压缩机数量</div>            
                <div class="central-ac-data__kv">{{dataGroup.compressorNumber}}</div>
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">负荷输出</div>
                <div class="central-ac-data__kv">{{dataGroup.loadOutput}}</div>
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
    @import '../../css/central-ac-data-well.css';
</style>