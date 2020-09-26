<template>
    <div class="electric-meter-circles-well">
        <!-- <div class="circles-row"> -->
            <!-- <electric-meter-value-circle :canvasInfo="lineABCanvas" :param="linePowerData.lineABvoltage"></electric-meter-value-circle>
            <electric-meter-value-circle :canvasInfo="lineBCCanvas" :param="linePowerData.lineBCvoltage"></electric-meter-value-circle> -->
        <!-- </div> -->

        <!-- <div class="circles-row"> -->
            <!-- <electric-meter-value-circle :canvasInfo="lineCACanvas" :param="linePowerData.lineCAvoltage"></electric-meter-value-circle>
            <electric-meter-value-circle :canvasInfo="totalPowerCanvas" :param="linePowerData.totalPowerFactor"></electric-meter-value-circle> -->
        <!-- </div> -->

        <!-- <div class="circles-row"> -->
            <electric-meter-value-circle :canvasInfo="reactivePowerCanvas" :param="linePowerData.totalReactivePower"></electric-meter-value-circle>
            <electric-meter-value-circle :canvasInfo="activePowerCanvas" :param="linePowerData.totalActivePower"></electric-meter-value-circle>
        <!-- </div> -->
    </div>
</template>
<script>
import ElectricMeterValueCircle from './ElectricMeterValueCircle.vue'
export default {
    data(){
        return {
            lineABCanvas:{
                maximum:550,
                step:1,
                name:'AB线电压',
                unit:'V',
                circleStyle:{
                    color:'rgb(255,168,151)'
                }
            },
            lineBCCanvas:{
                maximum:550,
                step:1,
                name:'BC线电压',
                unit:'V',
                circleStyle:{
                    color:'rgb(188,140,239)'
                }
            },
            lineCACanvas:{
                maximum:550,
                step:1,
                name:'CA线电压',
                unit:'V',
                circleStyle:{
                    color:'rgb(115,213,149)'
                }
            },
            totalPowerCanvas:{
                maximum:1,
                step:0.05,
                name:'总功率因素',
                unit:'',
                circleStyle:{
                    color:'rgb(85,138,255)'
                }
            },
            reactivePowerCanvas:{
                maximum:110,
                step:0.1,
                name:'总有功电量',
                unit:'W',
                circleStyle:{
                    color:'rgb(138,195,248)'
                }
            },
            activePowerCanvas:{
                maximum:110,
                step:0.1,
                name:'总有功功率',
                unit:'W',
                circleStyle:{
                    color:'rgb(254,196,43)'
                }
            },
        }
    },
    props:['linePowerData'],
    components:{
        'electric-meter-value-circle':ElectricMeterValueCircle
    }
}
</script>
<style>
    @import '../css/electric-meter-circles-well.css';
</style>