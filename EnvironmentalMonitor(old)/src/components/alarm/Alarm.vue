<template>
    <div class="ctm-container ctm-container_flex_column" style="background: white;">
        <div class="ctm-table">
            <div class="table-operation">
                <div class="table-operation__row">
                    <div class="table-operation__name">条件搜索</div>
                    <div class="table-operation__item">
                        <el-date-picker v-model="queryTime" size="mini" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="center" :picker-options="pickerOptions" style="margin-left:18px;">
                        </el-date-picker>
                    </div>
                </div>
                <div class="table-operation__row">
                    <div class="table-operation__name">数据过滤</div>
                    <div class="table-operation__item">
                        <el-input placeholder="关键字过滤" v-model="keyword" size="mini" style="margin-left: 18px;"></el-input>
                        <!-- <el-radio-group v-model="alarmFilterStatus" size="mini" style="margin-left: 18px;">
                            <el-radio-button :label="1">已读</el-radio-button>
                            <el-radio-button :label="0">未读</el-radio-button>
                            <el-radio-button :label="-1">未读</el-radio-button>
                        </el-radio-group> -->
                        <el-select v-model="alarmFilterStatus" placeholder="选择信息状态" size="mini" style="margin-left: 18px;">
                            <el-option label="已读" :value="1"></el-option>
                            <el-option label="未读" :value="0"></el-option>
                            <el-option label="全部" :value="-1"></el-option>
                        </el-select>
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

            <el-table :data="alarmToBeShown" v-loading="loading" border size="mini" height="calc(100% - 115px)">
                <el-table-column prop="deviceName" label="设备名称" min-width="70" align="center" head-align="center"></el-table-column>
                <el-table-column prop="time" label="告警时间"  min-width="60" align="center" head-align="center"></el-table-column>
                <el-table-column label="信息状态"  min-width="110" align="center" head-align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="warning" v-if="scope.row.isRead===0" @click="updateIsRead(scope.row)">转为已读</el-button>
                        <el-button size="mini" disabled v-else>已读</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <base-table-pagination :total="alarmToBeFiltered.length" :pageSize.sync="pageSize"  :currentPage.sync="currentPage"></base-table-pagination>
    </div>
</template>
<script>
import query from '@/js/query/alarm/totalAlarmQuery.js'
import {timeFormatTransform,pickerOptions} from '@/js/util/util.js'

export default {
    data(){
        return{
            queryTime:[new Date(), new Date()],
            pickerOptions:pickerOptions,
            keyword:'',
            pageSize:10,
            currentPage:1,
            alarms:[],
            loading:false,
            alarmFilterStatus:-1
        }
    },
    watch:{
        queryTime(val){
            this.getTotalAlarmByTime(timeFormatTransform(val[0]),timeFormatTransform(val[1]))
        }
    },
    computed:{
        alarmToBeFiltered(){
            return this.alarms
                    .filter(alarm=>
                        {
                            for(let i in alarm){
                                if(alarm[i].toString().indexOf(this.keyword)!=-1)
                                    return true
                            }
                            return false
                        }
                    )
                    .filter(alarm=>{
                        if(this.alarmFilterStatus===-1)
                            return true
                        else
                            return alarm.isRead===this.alarmFilterStatus
                    })
        },
        alarmToBeShown(){
            return this.alarmToBeFiltered.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
    },
    methods:{
        refresh(){
            return this.getTotalAlarmByTime(timeFormatTransform(this.queryTime[0]),timeFormatTransform(this.queryTime[1]))
        },
        getTotalAlarmByTime(t1,t2){
            return query.getTotalAlarmByTime(t1,t2)
            .then(data=>this.alarms=data)
        },
        // tableRowClassName({row}) {
        //     if (row.isRead) {
        //         return 'alarm-row'
        //     } 
        //     return ''
        // },
        updateIsRead(alarm){
            return query.updateIsRead(alarm.id)
            .then(()=>{
                alarm.isRead=1
                this.$store.dispatch('alarm/updateAlarm',true)
            })
        },
        getTotalAlarmAll(isRead){
            return query.getTotalAlarmAll(isRead)
            .then(data=>this.alarms=data)
        },
        getAlarmsExcel(){
            this.refresh()
            .then(()=>{
                if(this.loading){
                    this.$message.warning("数据正在加载，请请稍后再操作")
                    return
                }
                if(this.alarms.length===0){
                    this.$message.error("所选择时间段的数据为空，导出取消")
                    return
                }
                query.getTotalAlarmExcelByTime(timeFormatTransform(this.queryTime[0]),timeFormatTransform(this.queryTime[1]))
            })
        }
    },
    created(){
        this.getTotalAlarmAll(0)
    }

}
</script>
<style>
    @import '~@/css/page.css';
    @import '~@/css/components/base/tab/base-table.css';
</style>