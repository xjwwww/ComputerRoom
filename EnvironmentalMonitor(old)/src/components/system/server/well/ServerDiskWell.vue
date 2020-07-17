<template>
    <div class="server-disk-well">
        <div class="server-disk-well__header">磁盘使用情况</div>
        <div class="server-disk-well__content" ref="diskChart">
            
        </div>
        <el-pagination layout="prev, pager, next" :total="diskUsage.length" 
        :page-size="pageSize" :current-page.sync="currentPage" style="text-align: center;">
        </el-pagination>
    </div>
</template>
<script>

    export default{
        data(){
            return{
                currentPage:1,
                pageSize:2,
                diskChart:undefined,
                diskChartOption:{
                    legend: {bottom:0},
                    tooltip: {},
                    dataset: {
                        title:[],
                        source: [
                            ['disk'],
                            ['已使用(单位:G)'],
                            ['未使用(单位:G)']
                        ]
                    },
                   
                    series:[]
                },
               
            }
        },
        methods:{
            chartResize(){
                this.diskChart.resize()
            },
            initChart(){

                this.diskChartOption.dataset.source[0]=this.diskChartOption.dataset.source[0].slice(0,1)
                this.diskChartOption.dataset.source[1]=this.diskChartOption.dataset.source[1].slice(0,1)
                this.diskChartOption.dataset.source[2]=this.diskChartOption.dataset.source[2].slice(0,1)
                this.diskUsage.forEach(element=>{

                    let diskUsedSpace = (element.diskUsedSpace/1024/1024/1024).toFixed()
                    let diskFreeSpace = (element.diskFreeSpace/1024/1024/1024).toFixed()

                    this.diskChartOption.dataset.source[0].push(element.spaceName)
                    this.diskChartOption.dataset.source[1].push(diskUsedSpace)
                    this.diskChartOption.dataset.source[2].push(diskFreeSpace)

                })

            },
            loadChart(){
                
                let currentDisks = this.diskUsage.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize+2)// 0~3

                let diskTotalSpaceCE = (currentDisks[0].diskTotalSpace/1024/1024/1024).toFixed()
                let diskTotalSpaceDF = (currentDisks[1].diskTotalSpace/1024/1024/1024).toFixed()

                this.diskChartOption.title=[] 
                this.diskChartOption.series=[]
                    this.diskChartOption.series.push({
                        type:'pie',
                        radius: '70%',
                        center: ['25%', '45%'],
                        label:{
                            show:false  
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        encode: {
                            itemName: 'disk',
                            value: currentDisks[0].spaceName
                        }
                    })
                    this.diskChartOption.title.push({
                        subtext: `${currentDisks[0].spaceName}总容量:${diskTotalSpaceCE}G`,
                        subtextStyle:{
                            fontSize:16  
                        },
                        left: '25%',
                        bottom: '8%',
                        textAlign: 'center'
                    })
                    
                if(currentDisks[1]){
                    this.diskChartOption.series.push({
                        type:'pie',
                        radius: '70%',
                        center: ['75%', '45%'],
                        label:{
                            show:false  
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        encode: {
                            itemName: 'disk',
                            value: currentDisks[1].spaceName
                        }
                    })
                    this.diskChartOption.title.push({
                        subtext: `${currentDisks[1].spaceName}总容量:${diskTotalSpaceDF}G`,
                        subtextStyle:{
                            fontSize:16  
                        },
                        left: '75%',
                        bottom: '8%',
                        textAlign: 'center'
                    })
                }

                this.diskChart.setOption(this.diskChartOption)
            }
        },
        props:['diskUsage'],
        created(){
            //console.log(this.diskUsage)

            this.diskUsage.forEach(element=>{

                let diskUsedSpace = (element.diskUsedSpace/1024/1024/1024).toFixed()
                let diskFreeSpace = (element.diskFreeSpace/1024/1024/1024).toFixed()

                this.diskChartOption.dataset.source[0].push(element.spaceName)
                this.diskChartOption.dataset.source[1].push(diskUsedSpace)
                this.diskChartOption.dataset.source[2].push(diskFreeSpace)

            })

        },
        watch:{
            currentPage(){
                this.loadChart()
            },
            diskUsage:{
                handler(){
                    this.initChart()
                    this.loadChart()
                },
                deep:true
            }
        },
        mounted(){
            import('@/components/base/tab/baseHistoryInquiry/js/echart.config.js')
            .then(()=>{
                this.diskChart = this.$echarts.init(this.$refs.diskChart,'walden')
                this.loadChart()
                window.addEventListener("resize", this.chartResize)
            })

            //console.log(this.$refs)
        },
    }
</script>
<style>
    @import '../css/server-disk-well.css';
</style>