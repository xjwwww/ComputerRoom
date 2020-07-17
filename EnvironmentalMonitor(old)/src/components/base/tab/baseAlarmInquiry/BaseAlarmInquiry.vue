<template>
    <div class="ctm-container ctm-container_flex_column">
        <div class="ctm-table">
            <div class="table-operation">
                <div class="table-operation__row">
                    <div class="table-operation__name">条件搜索</div>
                    <div class="table-operation__item">
                        <el-cascader v-model="selectedIds" :options="groupsNode" :props="cascaderProps" size="mini" placeholder="请选择设备" style="margin-left: 18px;" :show-all-levels="true">
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
                    <div class="table-operation__name">数据过滤</div>
                    <div class="table-operation__item">
                        <el-input placeholder="关键字过滤" v-model="keyword" size="mini" style="margin-left: 18px;"></el-input>
                    </div>
                </div>
                <div class="table-operation__row">
                    <div class="table-operation__name">数据操作</div>
                    <div class="table-operation__item">
                        <button type="button" class="table-operation__button table-operation__button_function_refresh" @click="refresh">刷新</button>
                        <button type="button" class="table-operation__button table-operation__button_function_export" @click="getAlarmsExcel">导出</button>
                    </div>
                </div>
            </div>

            <!-- <el-table :data="alarmToBeShown" v-loading="loading" id="alarmTable" border size="mini" height="calc(100% - 115px)" :row-class-name="tableRowClassName"> -->
            <el-table :data="alarmToBeShown" v-loading="loading" border size="mini" height="calc(100% - 115px)">
                <!-- <el-table-column prop="groupName" label="组名" min-width="80" align="center" head-align="center"></el-table-column> -->
                <el-table-column prop="deviceName" label="设备名称" min-width="70" align="center" head-align="center"></el-table-column>
                <!-- <el-table-column label="设备名称" min-width="70" align="center" head-align="center">
                    {{}}
                </el-table-column>                 -->
                <el-table-column prop="description" label="告警描述" min-width="110" align="center" head-align="center"></el-table-column>
                <el-table-column prop="time" label="告警时间"  min-width="60" align="center" head-align="center"></el-table-column>
            </el-table>
            
        </div>

        <base-table-pagination :total="alarmToBeFiltered.length" :pageSize.sync="pageSize"  :currentPage.sync="currentPage"></base-table-pagination>
    </div>
</template>
<script>
    import {pickerOptions,deepClone} from '@/js/util/util.js'

    export default {
        name:'base-alarm-inquiry',
        data(){
            return{
                selectedIds:[],
                queryTime:[new Date(), new Date()],
                cascaderProps: {
                    label:'name',
                    emitPath:false, 
                },
                pickerOptions:pickerOptions,
                keyword:'',
                pageSize:10,
                currentPage:1,
                alarms:[],
                loading:false
            }
        },
        props:['groups','query'],
        computed:{
            alarmToBeFiltered(){
                return this.alarms.filter(alarm=>
                    {
                        for(let i in alarm){
                            if(alarm[i].toString().indexOf(this.keyword)!=-1)
                                return true
                        }
                        return false
                    }
                )
            },
            alarmToBeShown(){
                return this.alarmToBeFiltered.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
            },
            groupsNode(){
                let groupsNode=deepClone(this.groups)
                groupsNode.forEach(element=>this.initGroupNode(element))
                return groupsNode
            },  
        },
        watch:{
            queryTime(val){
                if(this.selectedIds&&this.selectedIds.length!==0)
                    this.getAlarms(this.selectedIds,val[0],val[1])
            },
            selectedIds(val){
                if(val&&val.length!==0)
                    this.getAlarms(val,this.queryTime[0],this.queryTime[1])
            }
        },
        methods:{
            refresh(){
                if(this.selectedIds&&this.selectedIds.length!==0)
                    this.getAlarms(this.selectedIds,this.queryTime[0],this.queryTime[1])
            },
            // tableRowClassName({row}) {
            //     if (row.isNew)
            //         return 'alarm-row'
            //     return ''
            // },
            getAlarms(deviceId,startTime,endTime){
                this.loading=true
                this.query.getAlarms(deviceId,startTime,endTime)
                .then(
                    data=>{
                        this.alarms=data
                        this.loading=false
                    }
                )
            },
            getAlarmsExcel(){
                if(this.loading){
                    this.$message.warning("数据正在加载，请请稍后再操作")
                    return
                }
                if(this.alarms.length===0){
                    this.$message.error("所选择时间段的数据为空，导出取消")
                    return
                }
                if(this.selectedIds&&this.selectedIds.length!==0){
                    this.query.getAlarmsExcel(this.selectedIds,this.queryTime[0],this.queryTime[1])
                }
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
            }
        },
    }
</script>
<style>
    @import '~@/css/page.css';
    @import '~@/css/components/base/tab/base-table.css';
</style>