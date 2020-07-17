<template>
    <div class="server-cpu-well">
        <div class="server-cpu-well__header">CPU使用情况</div>
        <div class="server-cpu-well__content">
            <div ref="CPUChart" class="cpu-pie"></div>
            <div class="cpu-progresses">
                <div class="cpu-progress">
                    <div class="cpu-progress__key">系统使用率</div>
                    <div class="cpu-progress__value">{{cpuUsage.cpuSys}}%</div>
                    <el-progress :percentage="cpuUsage.cpuSys" :show-text="false" color="#45C2F9"></el-progress>
                </div>
                <div class="cpu-progress">
                    <div class="cpu-progress__key">用户使用率</div>
                    <div class="cpu-progress__value">{{cpuUsage.cpuUser}}%</div>
                    <el-progress :percentage="cpuUsage.cpuUser" :show-text="false" color="#6BE6C1"></el-progress>
                </div>
                <div class="cpu-progress">
                    <div class="cpu-progress__key">总使用率</div>
                    <div class="cpu-progress__value">{{cpuUsage.cpuCombined}}%</div>
                    <el-progress :percentage="cpuUsage.cpuCombined" :show-text="false" color="#626C91"></el-progress>
                </div>
                <div class="cpu-progress">
                    <div class="cpu-progress__key">当前错误率</div>
                    <div class="cpu-progress__value">{{cpuUsage.cpuNice}}%</div>
                    <el-progress :percentage="cpuUsage.cpuNice" :show-text="false" color="#B0B7FD"></el-progress>
                </div>
                <div class="cpu-progress">
                    <div class="cpu-progress__key">当前等待率</div>
                    <div class="cpu-progress__value">{{cpuUsage.cpuWait}}%</div>
                    <el-progress :percentage="cpuUsage.cpuWait" :show-text="false" color="#D7FFBE"></el-progress>
                </div>
                <div class="cpu-progress">
                    <div class="cpu-progress__key">当前闲置率</div>
                    <div class="cpu-progress__value">{{cpuUsage.cpuIdle}}%</div>
                    <el-progress :percentage="cpuUsage.cpuIdle" :show-text="false" color="#A5F4FF"></el-progress>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default{
        data(){
            return{
                CPUChart:undefined,
                CPUChartOption :{
                    tooltip: {
                        trigger:'item',
                    },

                    series: [
                        {
                            name: '使用情况',
                            type: 'pie',
                            radius: ['70%', '90%'],
                            hoverOffset :5,
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '16',
                                        fontWeight: 'normal'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            }
                    
                        }
                    ]
                }
            }
        },
        methods:{
            chartResize(){
                this.CPUChart.resize()
            },
            loadChart(){
                this.CPUChartOption.series[0].data=[
                    {value: this.cpuUsage.cpuSys, name: '系统使用率'},
                    {value: this.cpuUsage.cpuUser, name: '用户使用率'},
                    {value: this.cpuUsage.cpuCombined, name: '总使用率'},
                    {value: this.cpuUsage.cpuNice, name: '当前错误率'},
                    {value: this.cpuUsage.cpuWait, name: '当前等待率'},
                    {value: this.cpuUsage.cpuIdle, name: '当前闲置率'}
                ]
                this.CPUChart.setOption(this.CPUChartOption)
            }
        },
        props:['cpuUsage'],
        watch:{
            cpuUsage:{
                handler(){
                    this.loadChart()
                },
                deep:true
            }
        },
        created(){
            //console.log(this.cpuUsage)
        },
        mounted(){
            import('@/components/base/tab/baseHistoryInquiry/js/echart.config.js')
            .then(()=>{
                this.CPUChart = this.$echarts.init(this.$refs.CPUChart,'walden')
                this.loadChart()               
                window.addEventListener("resize", this.chartResize)
            })
        },
        beforeDestroy(){
            window.removeEventListener("resize",this.chartResize)
        }
    }
</script>
<style>
    @import '../css/server-cpu-well.css';
</style>