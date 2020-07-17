<template>
    <div class="server-memory-swap-well">
        <div class="server-memory-swap-well__header">交换区使用情况</div>
        <!-- <div ref="UIChart" class="chart-show__history-chart"></div> -->
        <div class="server-memory-swap-well__content">
            <div>
                <div>{{swapUsage.swapTotal}}</div>
                <div style="color:gray;">交换区总量</div>
            </div>

            <div>
                <el-progress :percentage="inusePercentage" :show-text="false" color="#FEA974"></el-progress>
                <div class="memory-swap-progress__description">
                    <div class="memory-swap-progress__key">当前交换区使用量</div>
                    <div class="memory-swap-progress__value">{{swapUsage.swapUsed}}</div>
                </div>
            </div>

            <div>
                <el-progress :percentage="unusePercentage" :show-text="false" color="#FEA974"></el-progress>
                <div class="memory-swap-progress__description">
                    <div class="memory-swap-progress__key">当前交换区剩余量</div>
                    <div class="memory-swap-progress__value">{{swapUsage.swapFree}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import 

    export default{
        data(){
            return{
                inusePercentage:undefined,
                unusePercentage:undefined
            }
        },
        props:['swapUsage'],
        watch:{
            swapUsage:{
                handler(val){
                    //console.log(val)
                    let per=val.swapUsed/val.swapTotal*100
                    this.inusePercentage=parseFloat(per.toFixed(2))
                    this.unusePercentage=100-this.inusePercentage
                },
                immediate:true,
                deep:true
            },
        }
    }
</script>
<style>
    @import '../css/server-memory-swap-well.css';
</style>