<template>
    <div class="central-ac-data-well" style="flex:5;">
        <div class="central-ac-data-well__column">
            <div class="central-ac-data">
                <div class="central-ac-data__kv">系统状态</div>
                <div class="central-ac-status__v" v-if="statusGroup.systemStatus===0">正常</div>
                <div class="central-ac-status__v_alarm" v-else-if="statusGroup.systemStatus===1">异常</div>        
                <div class="central-ac-status__v_alarm" v-else>停机</div>        
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">工作模式</div>
                <div class="central-ac-status__v" v-if="statusGroup.workMode===0">制冷</div>
                <div class="central-ac-status__v_alarm" v-else-if="statusGroup.workMode===1">加热</div>        
                <div class="central-ac-status__v_alarm" v-else>停机</div>  
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">通讯故障</div>            
                <div class="central-ac-status__v" v-if="statusGroup.comunication===0">正常</div>
                <div class="central-ac-status__v_alarm" v-else-if="statusGroup.comunication===1">异常</div>        
                <div class="central-ac-status__v_alarm" v-else>停机</div>  
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">外部连锁</div>
                <div class="central-ac-status__v" v-if="statusGroup.externalChain===0">正常</div>
                <div class="central-ac-status__v_alarm" v-else-if="statusGroup.externalChain===1">异常</div>        
                <div class="central-ac-status__v_alarm" v-else>停机</div>  
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">空调泵过载</div>
                <div class="central-ac-status__v" v-if="statusGroup.acPump===0">正常</div>
                <div class="central-ac-status__v_alarm" v-else-if="statusGroup.acPump===1">异常</div>        
                <div class="central-ac-status__v_alarm" v-else>停机</div>  
            </div>
        </div>
        <div class="central-ac-data-well__divide"></div>
        <div class="central-ac-data-well__column">
            <div class="central-ac-data">
                <div class="central-ac-data__kv">系统出水温度过低</div>
                <div class="central-ac-status__v" v-if="statusGroup.outputWaterTempLow===0">正常</div>
                <div class="central-ac-status__v_alarm" v-else-if="statusGroup.outputWaterTempLow===1">异常</div>        
                <div class="central-ac-status__v_alarm" v-else>停机</div>        
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">系统出水温度过高</div>
                <div class="central-ac-status__v" v-if="statusGroup.outputWaterTempHigh===0">正常</div>
                <div class="central-ac-status__v_alarm" v-else-if="statusGroup.outputWaterTempHigh===1">异常</div>        
                <div class="central-ac-status__v_alarm" v-else>停机</div>  
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">机组空调总回水探头</div>            
                <div class="central-ac-status__v" v-if="statusGroup.inputWaterProbe===0">正常</div>
                <div class="central-ac-status__v_alarm" v-else-if="statusGroup.inputWaterProbe===1">异常</div>        
                <div class="central-ac-status__v_alarm" v-else>停机</div>  
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">机组空调总出水探头</div>
                <div class="central-ac-status__v" v-if="statusGroup.outputWaterProbe===0">正常</div>
                <div class="central-ac-status__v_alarm" v-else-if="statusGroup.outputWaterProbe===1">异常</div>        
                <div class="central-ac-status__v_alarm" v-else>停机</div>  
            </div>
            <div class="central-ac-data">
                <div class="central-ac-data__kv">环境温度探头</div>
                <div class="central-ac-status__v" v-if="statusGroup.tempProbe===0">正常</div>
                <div class="central-ac-status__v_alarm" v-else-if="statusGroup.tempProbe===1">异常</div>        
                <div class="central-ac-status__v_alarm" v-else>停机</div>  
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["statusGroup"]
}
</script>
<style>
    @import '../../css/central-ac-data-well.css';
</style>