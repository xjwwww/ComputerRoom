<template>
    <div class="server-memory-swap-well">
        <div class="server-memory-swap-well__header">内存使用情况</div>
        <!-- <div ref="UIChart" class="chart-show__history-chart"></div> -->
        <div class="server-memory-swap-well__content">
            <div>
                <div>{{memoryUsage.memTotal}}</div>
                <div style="color:gray;">总物理内存</div>
            </div>

            <div>
                <el-progress :percentage="inusePercentage" :show-text="false" color="#08B682"></el-progress>
                <div class="memory-swap-progress__description">
                    <div class="memory-swap-progress__key">已使用物理内存</div>
                    <div class="memory-swap-progress__value">{{memoryUsage.memUsed}}</div>
                </div>
            </div>

            <div>
                <el-progress :percentage="unusePercentage" :show-text="false" color="#08B682"></el-progress>
                <div class="memory-swap-progress__description">
                    <div class="memory-swap-progress__key">未使用物理内存</div>
                    <div class="memory-swap-progress__value">{{memoryUsage.memFree}}</div>
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
        props:['memoryUsage'],
        watch:{
            memoryUsage:{
                handler(val){
                    let per=val.memUsed/val.memTotal*100
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