<template>
    <!-- <div class="ctm-container ctm-container_flex_row">
        <div class="ctm-content ctm-content__main"> -->
            <div class="ctm-container">
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
                        <div ref="historyChart" v-loading="loading" class="chart-show__history-chart" v-show="!noDataShow"></div>
                        <div class="chart-show__history-chart chart-show__history-chart_no-data" v-show="noDataShow">暂无数据</div>
                    </div>
                </div>
            </div>
        <!-- </div>
    </div> -->
</template>
<script>
    import {pickerOptions,deepClone} from '@/js/util/util.js'
    // var e_macarons=require('./js/macaronsCustomized.js')
    // import '@/js/plugins/echart.config.js'

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
                historyChart:null,
                loading:false,
                chartOption:{
                    tooltip: {
                        trigger:'axis',
                    },
                    legend: {
                        // data:['温度','湿度']
                        data:[]
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
                        // {
                        //     type : 'value',
                        //     // name:'温度',
                        //     // min:0,
                        //     // max:100,
                        //     // axisLabel: {
                        //     //     formatter: '{value}℃'
                        //     // },
                        //     splitNumber:5
                        // },
                        // {
                        //     type : 'value',
                        //     // name:'湿度',
                        //     // min:0,
                        //     // max:100,
                        //     // axisLabel: {
                        //     //     formatter: '{value}%'
                        //     // },
                        //     splitNumber:5
                        // },
                        // {
                        //     type : 'value',
                        //     splitNumber:5
                        // }
                    ]
                    ,
                    series :[ 
                        // {
                        //     // name:"温度",
                        //     type:"line",
                        //     //yAxisIndex:0,
                        //     data:[]
                        // },
                        // {
                        //     // name:"湿度",
                        //     type:"line",
                        //     //yAxisIndex:1,
                        //     data:[]
                        // },
                        // {
                        //     type:"line",
                        //     data:[]
                        // }
                    ]
                    ,    
                },
                attrIndices:{},
                noDataShow:false
            }      
        },
        props:['groups','setting','query'],
        methods:{
            refresh(){
                if(this.selectedIds&&this.selectedIds.length!==0)
                    this.getHistory(this.selectedIds,this.queryTime[0],this.queryTime[1])
            },
            initChartOption(){
                let indice=0
                this.setting.yAxis.forEach((element,index)=>{
                    // this.chartOption.legend.data.push(element.name)
                    this.chartOption.yAxis.push({
                        type:'value',
                        name:element.name,
                        min:element.min,
                        max:element.max,
                        axisLabel:{
                            formatter:'{value}'+element.unit
                        },
                        splitNumber:5
                    })
                    element.datas.forEach(el=>{
                            this.chartOption.legend.data.push(el.name)
                            this.chartOption.series.push({
                                name:el.name,
                                type:'line',
                                yAxisIndex:index,
                                data:[]
                            })
                            this.attrIndices[el.attr]=indice
                            indice++
                        }
                    )
                    // this.chartOption.series.push({
                    //     name:element.name,
                    //     type:'line',
                    //     yAxisIndex:index,
                    //     data:[]
                    // })
                })
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
                        this.chartOption.xAxis[0].data=[]
                        this.chartOption.series.forEach(element=>element.data=[])
                        data.forEach(element=>{
                            this.chartOption.xAxis[0].data.push(element['time'])
                            for(let i=0;i<this.setting.yAxis.length;i++){
                                let yAxisDatas=this.setting.yAxis[i].datas
                                for(let j=0;j<yAxisDatas.length;j++){
                                    let attr=yAxisDatas[j].attr
                                    console.log("attr:"+attr)
                                    this.chartOption.series[this.attrIndices[attr]].data.push(element[attr])
                                }
                            }
                        })
                        // setTimeout(()=>{this.historyChart.setOption(this.chartOption)},100)
                        this.historyChart.setOption(this.chartOption)
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
                this.historyChart.resize()
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
            import('./js/echart.config.js')
            .then(()=>{
                this.initChartOption()
                this.historyChart = this.$echarts.init(this.$refs.historyChart,'walden')
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
    @import './base-history-inquiry.css';
</style>