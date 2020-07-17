<template>
    <div class="ctm-container ctm-container_flex_column">
        <div class="ctm-chart">
            <div class="table-operation">
                <div class="table-operation__row">
                    <div class="table-operation__name">条件搜索</div>
                    <div class="table-operation__item">
                        <el-cascader v-model="selectedIds" :options="groupsNode" :props="cascaderProps" size="mini" placeholder="请选择设备" style="margin-left: 18px;">
                            <template slot-scope="{ node, data }">
                                <i class="el-icon-s-tools" v-if="data.deviceId"></i>
                                <i class="el-icon-menu" v-else></i>
                                {{ data.name }}
                            </template>
                        </el-cascader>
                        <el-date-picker v-model="queryTime" size="mini" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="center" :picker-options="pickerOptions" style="margin-left:18px;">
                        </el-date-picker>
                    </div>
                </div>
                <div class="table-operation__row">
                    <div class="table-operation__name">数据操作</div>
                    <div class="table-operation__item">
                        <button type="button" class="table-operation__button table-operation__button_function_refresh" @click="refresh">刷新</button>
                        <button type="button" class="table-operation__button table-operation__button_function_export" @click="getHistoryExcel">导出</button>
                    </div>
                </div>
            </div>

            <div class="chart-show">
                <div class="chart-show__history-chart chart-show__history-chart_no-data" v-show="noDataShow">暂无数据</div>
                <el-tabs tab-position="left" style="height: 100%;" v-show="!noDataShow" @tab-click="refreshChart">
                    <el-tab-pane label="电压电流">        
                        <div ref="UIChart" v-loading="loading" class="chart-show__history-chart"></div>
                    </el-tab-pane>
                    <el-tab-pane label="功率电量">
                        <div ref="PChart" v-loading="loading" class="chart-show__history-chart"></div>                        
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
    import {pickerOptions,deepClone} from '@/js/util/util.js'
    // var e_macarons=require('../../base/tab/baseHistoryInquiry/js/macaronsCustomized.js')

    export default {
        name:'base-history-inquiry',
        data(){
            return{
                sidetreeOpen:true,
                selectedIds:[],
                queryTime:[new Date(), new Date()],
                pickerOptions:pickerOptions,
                cascaderProps: {
                    label:'name',
                    emitPath:false, 
                },
                UIChart:null,
                PChart:null,
                loading:false,
                UIChartOption:{
                    tooltip: {
                        trigger:'axis',
                    },
                    legend: {
                        // data:['温度','湿度']
                        data:['A相电压','B相电压','C相电压','A相电流','B相电流','C相电流']
                    },
                    dataZoom: {
                        show: true,
                        start : 0
                    },
                    animationDuration:1000,
                    toolbox:{
                        show:true,
                        feature:{
                            magicType:{show:true,type:['line','bar']},
                            dataZoom : {show: true},
                            dataView : {show: true},
                            restore:{show:true},
                            saveAsImage:{show:true}
                        }
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap:false,
                            data:[]
                        }
                    ],
                    yAxis :[
                        {
                            type : 'value',
                            name:'电压',
                            min:0,
                            max:100,
                            axisLabel: {
                                formatter: '{value}V'
                            },
                            splitNumber:5
                        },
                        {
                            type : 'value',
                            name:'电流',
                            min:0,
                            max:100,
                            axisLabel: {
                                formatter: '{value}A'
                            },
                            splitNumber:5
                        },
                    ]
                    ,
                    series :[ 
                        {
                            name:"A相电压",
                            type:"line",
                            yAxisIndex:0,
                            data:[]
                        },
                        {
                            name:"B相电压",
                            type:"line",
                            yAxisIndex:0,
                            data:[]
                        },
                        {
                            name:"C相电压",
                            type:"line",
                            yAxisIndex:0,
                            data:[]
                        },
                        {
                            name:"A相电流",
                            type:"line",
                            yAxisIndex:1,
                            data:[]
                        },
                        {
                            name:"B相电流",
                            type:"line",
                            yAxisIndex:1,
                            data:[]
                        },
                        {
                            name:"C相电流",
                            type:"line",
                            yAxisIndex:1,
                            data:[]
                        },
                    ]
                    ,
                },
                PChartOption:{
                    tooltip: {
                        trigger:'axis',
                    },
                    legend: {
                        data:['总功率(kW)','用电时间(h)','电量(kW·h)']
                    },
                    dataZoom: {
                        show: true,
                        start : 0
                    },
                    animationDuration:1000,
                    toolbox:{
                        show:true,
                        feature:{
                            magicType:{show:true,type:['line','bar']},
                            dataZoom : {show: true},
                            dataView : {show: true},
                            restore:{show:true},
                            saveAsImage:{show:true}
                        }
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap:false,
                            data:[]
                        }
                    ],
                    yAxis :[
                        {
                            type : 'value',
                            name:'总功率',
                            min:0,
                            max:100,
                            axisLabel: {
                                formatter: '{value}kW'
                            },
                            splitNumber:5
                        },
                        {
                            type : 'value',
                            name:'用电时间',
                            min:0,
                            max:100,
                            axisLabel: {
                                formatter: '{value}h'
                            },
                            splitNumber:5
                        },
                        {
                            type : 'value',
                            name:'电量',
                            min:0,
                            max:100,
                            axisLabel: {
                                formatter: '{value}kW·h'
                            },
                            splitNumber:5,
                            offset:60
                        },
                    ]
                    ,
                    series :[ 
                        {
                            name:"总功率",
                            type:"line",
                            yAxisIndex:0,
                            data:[]
                        },
                        {
                            name:"用电时间",
                            type:"line",
                            yAxisIndex:1,
                            data:[]
                        },
                        {
                            name:"电量",
                            type:"line",
                            yAxisIndex:2,
                            data:[]
                        }
                    ]
                    ,
                },
                noDataShow:false
            }      
        },
        props:['groups','query'],
        methods:{
            refresh(){
                if(this.selectedIds&&this.selectedIds.length!==0)
                    this.getHistory(this.selectedIds,this.queryTime[0],this.queryTime[1])
            },
            getHistory(deviceId,startTime,endTime){
                this.loading=true
                return this.query.getHistory(deviceId,startTime,endTime)
                .then(data=>{
                        this.loading=false
                        return data
                    }
                )
                .then(
                    data=>{
                        if(data.length===0){
                            this.noDataShow=true
                            return
                        }
                        this.noDataShow=false
                        this.PChartOption.xAxis[0].data=[]
                        this.UIChartOption.xAxis[0].data=[]
                        this.PChartOption.series.forEach(element=>element.data=[])
                        this.UIChartOption.series.forEach(element=>element.data=[])
                        data.forEach(element=>{
                            this.UIChartOption.xAxis[0].data.push(element['time'])
                            this.PChartOption.xAxis[0].data.push(element['time'])

                            this.UIChartOption.series[0].data.push(element.AVoltage)
                            this.UIChartOption.series[1].data.push(element.BVoltage)
                            this.UIChartOption.series[2].data.push(element.CVoltage)
                            this.UIChartOption.series[3].data.push(element.ACurrent)
                            this.UIChartOption.series[4].data.push(element.BCurrent)
                            this.UIChartOption.series[5].data.push(element.CCurrent)

                            this.PChartOption.series[0].data.push(element.totalPower)
                            this.PChartOption.series[1].data.push(element.usedTime)
                            this.PChartOption.series[2].data.push(element.electricQuantity)
                        })
                        this.UIChart.setOption(this.UIChartOption)
                        this.PChart.setOption(this.PChartOption)
                    }
                )
            },
            initGroupNode(node){
                if(node.deviceId){
                    node.leaf=true
                    node.value=node.deviceId
                    return node
                }
                node.value=node.groupId*-1
                node.children=[]     
                if(node.group&&node.group.length){
                    node.group.forEach(element=>{
                        node.children.push(this.initGroupNode(element))
                    })
                }
                if(node.devices&&node.devices.length){
                    node.devices.forEach(element=>{
                        node.children.push(this.initGroupNode(element))
                    })
                }
                if(!node.children.length)
                    node.leaf=true
                return node
            },
            chartResize(){
                this.UIChart.resize()
                this.PChart.resize()
            },
            refreshChart(){
                setTimeout(this.chartResize,250)
            },
            getHistoryExcel(){
                if(this.loading){
                    this.$message.warning("数据正在加载，请请稍后再操作")
                    return
                }
                if(this.noDataShow){
                    this.$message.error("所选择时间段的数据为空，导出取消")
                    return
                }
                if(this.selectedIds&&this.selectedIds.length!==0){
                    this.query.getHistoryExcel(this.selectedIds,this.queryTime[0],this.queryTime[1])
                }
            }
        },
        watch:{
            queryTime(val){
                if(this.selectedIds&&this.selectedIds.length!==0)
                    this.getHistory(this.selectedIds,val[0],val[1])
            },
            selectedIds(val){
                if(val&&val.length!==0)
                    this.getHistory(val,this.queryTime[0],this.queryTime[1])
            }
        },
        computed:{
            groupsNode(){
                let groupsNode=deepClone(this.groups)
                groupsNode.forEach(element=>this.initGroupNode(element))
                return groupsNode
            }
        },
        mounted(){
            import('../../base/tab/baseHistoryInquiry/js/echart.config.js')
            .then(()=>{
                this.UIChart = this.$echarts.init(this.$refs.UIChart,'walden')
                this.PChart=this.$echarts.init(this.$refs.PChart,'walden')
                window.addEventListener("resize", this.chartResize)
            })
        },
        beforeDestroy(){
            window.removeEventListener("resize",this.chartResize)
        }
    }
</script>
<style>
    @import '~@/css/page.css';
    @import '~@/css/components/base/tab/base-table.css';
    @import '~@/components/base/tab/baseHistoryInquiry/base-history-inquiry.css';
</style>