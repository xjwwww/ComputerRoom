<template>
    <div class="electric-meter-phase-well">
        <div class="electric-meter-phase-well__title" :class="phase.className">{{phase.name}}</div>
        <div class="electric-meter-phase-well__content">
            <div class="electric-meter-phase-well__param">
                <div class="electric-meter-phase-well__value" :class="[phase.className,{'electric-meter-phase-well__value_alarm':curAlarm}]" data-unit="A">{{phaseData.current}}</div>
                <div class="electric-meter-phase-well__key" :class="{'electric-meter-phase-well__key_alarm':curAlarm}">电流</div>
            </div>
            <div class="electric-meter-phase-well__divider"></div>
            <div class="electric-meter-phase-well__param">
                <div class="electric-meter-phase-well__value" :class="[phase.className,{'electric-meter-phase-well__value_alarm':volAlarm}]"  data-unit="V">{{phaseData.voltage}}</div>
                <div class="electric-meter-phase-well__key" :class="{'electric-meter-phase-well__key_alarm':volAlarm}">电压</div>
            </div>
            <div class="electric-meter-phase-well__divider"></div>
            <div class="electric-meter-phase-well__param">
                <div class="electric-meter-phase-well__value" :class="[phase.className,{'electric-meter-phase-well__value_alarm':activePowerAlarm}]"  data-unit="W">{{phaseData.activePower}}</div>
                <div class="electric-meter-phase-well__key" :class="{'electric-meter-phase-well__key_alarm':activePowerAlarm}">有功功率</div>
            </div>
            <div class="electric-meter-phase-well__divider"></div>
            <div class="electric-meter-phase-well__param">
                <div class="electric-meter-phase-well__value" :class="[phase.className,{'electric-meter-phase-well__value_alarm':reactivePowerAlarm}]"  data-unit="W">{{phaseData.reactivePower}}</div>
                <div class="electric-meter-phase-well__key" :class="{'electric-meter-phase-well__key_alarm':reactivePowerAlarm}">无功功率</div>
            </div>
            <div class="electric-meter-phase-well__divider"></div>
            <div class="electric-meter-phase-well__param">
                <div class="electric-meter-phase-well__value" :class="[phase.className,{'electric-meter-phase-well__value_alarm':powerFactorAlarm}]"  data-unit="">{{phaseData.powerFactor}}</div>
                <div class="electric-meter-phase-well__key" :class="{'electric-meter-phase-well__key_alarm':powerFactorAlarm}">功率因素</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            curAlarm:false,
            volAlarm:false,
            activePowerAlarm:false,
            reactivePowerAlarm:false,
            powerFactorAlarm:false
        }
    },
    props:['phaseData','phase','status'],
    // computed(){
    //     currentAlarm(){
    //         return this.status===1&&(this.phaseData.current<this.phaseData.setting.minCur||this.phaseData.current>this.phaseData.setting.maxCur)
    //     },
    //     voltageAlarm(){
    //         return this.status===1&&(this.phaseData.current<this.phaseData.setting.minCur||this.phaseData.current>this.phaseData.setting.maxCur)
    //     },
    // }
    watch:{
        status(val){
            if(val===1){
                this.curAlarm=(this.phaseData.current<this.phaseData.setting.minCur||this.phaseData.current>this.phaseData.setting.maxCur)
                this.volAlarm=(this.phaseData.voltage<this.phaseData.setting.minVol||this.phaseData.voltage>this.phaseData.setting.maxVol)
                this.activePowerAlarm=(this.phaseData.activePower<this.phaseData.setting.minPap||this.phaseData.activePower>this.phaseData.setting.maxPap)
                this.reactivePowerAlarm=(this.phaseData.reactivePower<this.phaseData.setting.minPrp||this.phaseData.reactivePower>this.phaseData.setting.maxPrp)
                this.powerFactorAlarm=(this.phaseData.powerFactor<this.phaseData.setting.minPpf||this.phaseData.powerFactor>this.phaseData.setting.maxPpf)
            }
        }
    }
}
</script>
<style>
    @import '../css/electric-meter-phase-well.css';
</style>