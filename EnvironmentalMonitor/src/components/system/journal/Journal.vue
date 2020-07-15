<template>
  <div class="ctm-container ctm-container_flex_row" style="background:#ffffff;">
    <div class="ctm-content ctm-content__main">
      <div class="ctm-container ctm-container_flex_column">
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
              </div>
            </div>
            <div class="table-operation__row">
              <div class="table-operation__name">数据操作</div>
              <div class="table-operation__item">
                <button type="button" class="table-operation__button table-operation__button_function_refresh" @click="refresh">刷新</button>
                <button type="button" class="table-operation__button table-operation__button_function_export" @click="getJournalExcel">导出</button>
              </div>
            </div>
          </div>

          <el-table :data="journalToBeShown" id="journalTable" border style="width: 100%" size="mini" height="calc(100% - 115px)">
            <el-table-column prop="username" label="用户名" min-width="70" align="center" head-align="center" :filters="usernameList" :filter-method="filterUsername"></el-table-column>
            <el-table-column prop="operationType" label="事件类型" min-width="110" align="center" head-align="center" :filters="operationTypeList" :filter-method="filterOperationType"></el-table-column>
            <!-- <el-table-column prop="username" label="用户名" min-width="70" align="center" head-align="center"  ></el-table-column>
            <el-table-column prop="operationType" label="事件类型" min-width="110" align="center" head-align="center" ></el-table-column> -->
            <el-table-column prop="operationName" label="事件描述"  min-width="50" align="center" head-align="center"></el-table-column>
            <el-table-column prop="time" label="时间"  min-width="60" align="center" head-align="center"></el-table-column>
          </el-table>
        </div>
        <base-table-pagination :total="journalToBeFiltered.length" :pageSize.sync="pageSize"  :currentPage.sync="currentPage"></base-table-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import query from './logQuery.js'
import {timeFormatTransform,pickerOptions,deepClone} from '@/js/util/util.js'

export default {
  data(){
    return{
      queryTime:[new Date(), new Date()],
      pickerOptions:pickerOptions,
      keyword:'',
      pageSize:10,
      currentPage:1,
      journals:[],
      operationTypeList:[
        {text:'查询操作',value:'查询操作'},
        {text:'修改操作',value:'修改操作'},
        {text:'删除操作',value:'删除操作'},
        {text:'添加操作',value:'添加操作'},
      ],
      usernameList:[]
    }
  },
  computed:{
    journalToBeFiltered(){
      return this.journals.filter(journal=>
        {
          for(let i in journal){
            if(journal[i].toString().indexOf(this.keyword)!=-1)
              return true
          }
          return false
        }
      )
    },
    journalToBeShown(){
      return this.journalToBeFiltered.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
    },
    groupsNode(){
      let groupsNode=deepClone(this.groups)
      groupsNode.forEach(element=>this.initGroupNode(element))
      return groupsNode
    },
  },
  watch:{
    queryTime(val){
      this.getJournal(timeFormatTransform(val[0]),timeFormatTransform(val[1]));
    },
  },
  methods:{
    refresh(){
      this.getJournal(this.queryTime[0],this.queryTime[1])
    },
    filterUsername(value, row) {
      return row.username === value
    },
    filterOperationType(value, row) {
      return row.operationType === value
    },
    getJournal(startTime,endTime){
      let loadingInstance=this.$loading.service({target:'#journalTable'})
      return query.getJournals({startTime,endTime})
      .then(data=>{
          loadingInstance.close()
          this.journals=data
        }
      )
      .then(()=>
        this.refreshUsernameList()
      )
    },
    refreshUsernameList(){
      this.usernameList=[]
      let usernameFlag={}
      this.journals.forEach(journal=>{
        if(!usernameFlag[journal.username]){
          this.usernameList.push({text:journal.username,value:journal.username})
          usernameFlag[journal.username]=true
        }
      })
    },
    getJournalExcel(){
      if(this.loading){
          this.$message.warning("数据正在加载，请请稍后再操作")
          return
      }
      if(this.journals.length===0){
          this.$message.error("所选择时间段的数据为空，导出取消")
          return
      }
      query.getJournalsExcel(this.queryTime[0],this.queryTime[1])
    }
  }
}
</script>
<style>
  @import '~@/css/page.css';
  @import '~@/css/components/base/tab/base-table.css';
</style>