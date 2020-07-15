<template>
    <div class="electric-meter-well">
        <div class="electric-meter-well__head">{{device.name}}</div>
        <div class="electric-meter-well__subhead">{{device.groupName}}</div>
        <div class="electric-meter-well__content">
            <div class="electric-meter-well__phase-content">
                <electric-meter-phase :phaseData="device.phaseAData" :phase="phaseA" :status="device.status"></electric-meter-phase>
                <electric-meter-phase :phaseData="device.phaseBData" :phase="phaseB" :status="device.status"></electric-meter-phase>
                <electric-meter-phase :phaseData="device.phaseCData" :phase="phaseC" :status="device.status"></electric-meter-phase>
            </div>
            <div class="electric-meter-well__circle-content">
                <electric-meter-circles :linePowerData="device.linePowerData"></electric-meter-circles>
            </div>
        </div>
    </div>
</template>
<script>
import ElectricMeterPhaseWell from './ElectricMeterPhaseWell.vue'
import ElectricMeterCirclesWell from './ElectricMeterCirclesWell.vue'
export default {
    data(){
        return{
            phaseA:{
                name:'A相',
                className:'a-phase'
            },
            phaseB:{
                name:'B相',
                className:'b-phase'
            },
            phaseC:{
                name:'C相',
                className:'c-phase'
            }
        }
    },
    props:['device'],
    components:{
        'electric-meter-phase':ElectricMeterPhaseWell,
        'electric-meter-circles':ElectricMeterCirclesWell
    },
    watch:{
        device(val){
            this.phaseA.setting={
                maxVol:val.pemMaxAvol,
                minVol:val.pemMinAvol,
                maxCur:val.pemMaxAcur,
                minCur:val.pemMinAcur,
                maxPap:val.pemMaxApap,
                minPap:val.pemMinApap,
                maxPrp:val.pemMaxAprp,
                minPrp:val.pemMinAprp,
                maxPpf:val.pemMaxAppf,
                minPpf:val.pemMinAppf,
            }
            this.phaseB.setting={
                maxVol:val.pemMaxBvol,
                minVol:val.pemMinBvol,
                maxCur:val.pemMaxBcur,
                minCur:val.pemMinBcur,
                maxPap:val.pemMaxBpap,
                minPap:val.pemMinBpap,
                maxPrp:val.pemMaxBprp,
                minPrp:val.pemMinBprp,
                maxPpf:val.pemMaxBppf,
                minPpf:val.pemMinBppf,
            }
            this.phaseC.setting={
                maxVol:val.pemMaxCvol,
                minVol:val.pemMinCvol,
                maxCur:val.pemMaxCcur,
                minCur:val.pemMinCcur,
                maxPap:val.pemMaxCpap,
                minPap:val.pemMinCpap,
                maxPrp:val.pemMaxCprp,
                minPrp:val.pemMinCprp,
                maxPpf:val.pemMaxCppf,
                minPpf:val.pemMinCppf,
            }
        }
    },
}
</script>
<style>
    @import '../css/electric-meter-well.css';
</style>