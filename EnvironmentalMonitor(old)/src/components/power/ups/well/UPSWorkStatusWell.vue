<template>
    <div class="ups-work-status-well" ref="ups-work-status-well">
        <div class="ups-work-status">
            <div class="ups-work-status__icon ups-work-status__icon_status_load"></div>
            <div class="ups-work-status__footer">
                <div class="ups-work-status__value" v-if="device.upsLoad===0">正常</div>
                <div class="ups-work-status__value ups-work-status__value_alarm" v-else-if="device.upsLoad===1">过载</div>
                <div class="ups-work-status__name">UPS负载</div>
            </div>
        </div>
        <div class="ups-work-status">
            <div class="ups-work-status__icon ups-work-status__icon_status_temperature"></div>
            <div class="ups-work-status__footer">
                <div class="ups-work-status__value" v-if="device.upsTemp===0">正常</div>
                <div class="ups-work-status__value ups-work-status__value_alarm" v-else-if="device.upsTemp===1">温度过高</div>
                <div class="ups-work-status__name">UPS温度</div>
            </div>
        </div>
        <div class="ups-work-status">
            <div class="ups-work-status__icon ups-work-status__icon_status_battery"></div>
            <div class="ups-work-status__footer">
                <div class="ups-work-status__value" v-if="device.upsStatus===0">交流输入正常</div>
                <div class="ups-work-status__value ups-work-status__value_alarm" v-else-if="device.upsStatus===1">后备供电中</div>
                <div class="ups-work-status__name">电池状态</div>
            </div>
        </div>
        <div class="ups-work-status">
            <div class="ups-work-status__icon ups-work-status__icon_status_converter"></div>
            <div class="ups-work-status__footer">
                <div class="ups-work-status__value" v-if="device.converterStatus===0">正常</div>
                <div class="ups-work-status__value ups-work-status__value_alarm" v-else-if="device.converterStatus===1">异常</div>
                <div class="ups-work-status__name">逆变器状态</div>
            </div>
        </div>
        <div class="ups-work-status">
            <div class="ups-work-status__icon ups-work-status__icon_status_rectifier"></div>
            <div class="ups-work-status__footer">
                <div class="ups-work-status__value" v-if="device.rectifierStatus===0">正常</div>
                <div class="ups-work-status__value ups-work-status__value_alarm" v-else-if="device.rectifierStatus===1">异常</div>
                <div class="ups-work-status__name">整流器状态</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['device'],
    mounted(){
        let iconElements=this.$refs["ups-work-status-well"].querySelectorAll(".ups-work-status__icon")
        let width=this.$refs["ups-work-status-well"].querySelector(".ups-work-status").getBoundingClientRect().width-20
        for(let i=iconElements.length-1;i>=0;i--){
            iconElements[i].style.height=iconElements[i].style.width=width+'px'
            iconElements[i].style['border-width']=width*0.1+'px'
        }
    }
}
</script>
<style>
    @import '../css/ups-work-status-well.css';
</style>