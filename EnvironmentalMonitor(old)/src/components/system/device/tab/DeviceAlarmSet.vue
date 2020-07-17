<template>
    <div class="ctm-container ctm-container_flex_column">
        <div class="alarm-set-body">
          <!-- <div>
            <el-col :offset="4" :span="16">
              <el-col :span="18">
                  邮箱地址：<div style="width:120px;display: inline-block;"><el-input v-model="emailInfo.email" size="mini"></el-input></div>
                  &emsp;发送方：<div style="width:120px;display: inline-block;"><el-input v-model="emailInfo.user" size="mini"></el-input></div>
                  &emsp;密码：<div style="width:120px;display: inline-block;"><el-input v-model="emailInfo.password" size="mini"></el-input></div>
              </el-col>
              <el-col :span="2">余额：{{fare}}</el-col>
              <el-button type="primary" size="mini">查询</el-button>
            </el-col>
          </div> -->
          <!-- <el-col :offset="1" :span="22"> -->
            <el-table :data="dailyAlarmSettings" border style="width: 100%" size="mini">
              <el-table-column prop="week" label="星期" header-align="center" align="center" min-width="50"> </el-table-column>
              <el-table-column prop="time1" label="时间段1" header-align="center" align="center"> </el-table-column>
              <el-table-column prop="time2" label="时间段2" header-align="center" align="center"> </el-table-column>
              <el-table-column prop="time3" label="时间段3" header-align="center" align="center"> </el-table-column>
              <el-table-column prop="sms" header-align="center" align="center">
                <template slot="header">
                  <!-- <el-switch v-model="sms" size="mini"></el-switch><span>短信报警</span> -->
                  <el-checkbox v-model="sms" style="margin-bottom:0;" :true-label="1" :false-label="0" :disabled="!hasPermission">短信报警</el-checkbox>
                </template>
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.sms" :inactive-value="0" :active-value="1" :disabled="!hasPermission" @change="()=>query.updateDailyAlarmSetting(scope.row)"></el-switch>
                </template>
              </el-table-column>

              <el-table-column prop="phone" header-align="center" align="center">
                <template slot="header">
                  <el-checkbox v-model="phone" style="margin-bottom:0;" :true-label="1" :false-label="0" :disabled="!hasPermission">语言报警</el-checkbox>
                </template>
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.phone" :inactive-value="0" :active-value="1" :disabled="!hasPermission" @change="()=>query.updateDailyAlarmSetting(scope.row)"></el-switch>
                </template>
              </el-table-column>

              <el-table-column prop="soundLight" header-align="center" align="center">
                <template slot="header">
                  <el-checkbox v-model="soundLight" style="margin-bottom:0;" :true-label="1" :false-label="0" :disabled="!hasPermission">声光报警</el-checkbox>
                </template>
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.soundLight" :inactive-value="0" :active-value="1" :disabled="!hasPermission" @change="()=>query.updateDailyAlarmSetting(scope.row)"></el-switch>
                </template>
              </el-table-column>

              <el-table-column prop="email" header-align="center" align="center">
                <template slot="header">
                  <el-checkbox v-model="email" style="margin-bottom:0;" :true-label="1" :false-label="0" :disabled="!hasPermission">邮箱报警</el-checkbox>
                </template>
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.email" :inactive-value="0" :active-value="1" :disabled="!hasPermission" @change="()=>query.updateDailyAlarmSetting(scope.row)"></el-switch>
                </template>
              </el-table-column>

              <el-table-column prop="timeInterval" label="报警时间间隔" header-align="center" align="center" min-width="80">
                <template slot-scope="scope">
                  {{scope.row.timeInterval}}分钟
                </template>
              </el-table-column>
              <el-table-column label="操作" header-align="center" align="center" min-width="50" v-if="hasPermission">
                <template slot-scope="scope">
                  <el-button size="mini" @click="openDialog(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          <!-- </el-col> -->
          <div class="alarm-set-group">
            <el-button size="mini" @click="openEmailDialog">邮箱设置</el-button>
          </div>
        </div>

        <el-dialog title="报警修改" :visible.sync="dialogVisible" width="400px" center custom-class="ctm-dialog">
          <el-form ref="dailyAlarmSettingForm" :model="dailyAlarmSettingForm" :rules="formRules" label-width="80px" size="small">
            <el-form-item label="星期">
              <el-input v-model="dailyAlarmSettingForm.week" type="text" disabled></el-input>
            </el-form-item>
            <el-form-item label="时间段1" prop="time1">
              <el-input v-model="dailyAlarmSettingForm.time1" type="text"></el-input>
            </el-form-item>
            <el-form-item label="时间段2" prop="time2">
              <el-input v-model="dailyAlarmSettingForm.time2" type="text"></el-input>
            </el-form-item>
            <el-form-item label="时间段3" prop="time3">
              <el-input v-model="dailyAlarmSettingForm.time3" type="text"></el-input>
            </el-form-item>
            <el-form-item label="时间间隔" prop="timeInterval">
              <el-input v-model.number="dailyAlarmSettingForm.timeInterval" type="text"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <div style="width:50%;">
              <button @click="handleDialog" class="create">确 定</button>
            </div>
            <div style="width:50%;">
              <button @click="dialogVisible = false" class="cancel">取 消</button>
            </div>                    
          </span>
        </el-dialog>

        <el-dialog title="邮箱设置修改" :visible.sync="emailDialogVisible" width="450px" center custom-class="ctm-dialog">
          <el-form ref="emailForm" :model="emailSettingForm" :rules="emailFormRules" label-width="100px" size="small">
            <el-form-item label="发送方邮箱" prop="from">
              <el-input v-model="emailSettingForm.from">
                <el-select v-model="emailSettingForm.type" slot="append" placeholder="请选择" style="width:120px;">
                  <el-option label="@qq.com" :value="1"></el-option>
                  <el-option label="@163.com" :value="2"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="代理密码" prop="password">
              <el-input v-model="emailSettingForm.password" type="text"></el-input>
            </el-form-item>
            <el-form-item label="邮件标题" prop="subject">
              <el-input v-model="emailSettingForm.subject" type="text"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <div style="width:50%;">
              <button @click="handleEmailDialog" class="create">确 定</button>
            </div>
            <div style="width:50%;">
              <button @click="emailDialogVisible = false" class="cancel">取 消</button>
            </div>                    
          </span>
        </el-dialog>
    </div>
</template>
<script>
import query from '../js/alarmSetQuery.js'

export default {
    data(){
      var timeRangePass=function(rule,value,callback){
        if(value==='')
          callback(new Error('请输入数值'))
        else if(!(/^\d{1,2}:\d{1,2}-\d{1,2}:\d{1,2}$/.test(value)))
          callback(new Error('请按照格式输入数值'))
        else
          callback()
      }

      return {
        sms:1,
        phone:1,
        soundLight:1,
        email:1,
        dailyAlarmSettings:[],
        dailyAlarmSettingForm: {},
        formRules:{
          time1:[
            { required: true, validator: timeRangePass, trigger: 'blur'}
          ],
          time2:[
            { required: true, validator: timeRangePass, trigger: 'blur'}
          ],
          time3:[
            { required: true, validator: timeRangePass, trigger: 'blur'}
          ],
          timeInterval:[
            { required: true, message: '时间不能为空'},
            { type: 'number', message: '时间必须为数字值'},
          ]
        },
        dialogVisible:false,
        query:query,
        emailSetting:{},
        emailSettingForm:{},
        emailFormRules:{
            from:[
                { required: true, message: '请选择地址'}
            ],
            password:[
                { required: true, message: '请选择地址'}            
            ],
            subject:[
                { required: true, message: '请选择地址'}
            ],
        },
        emailDialogVisible:false,
      }
    },
    watch:{
      sms(val){
        this.dailyAlarmSettings.forEach(element => {
          element.sms=val
        })
        this.changeAllSetting()
      },
      phone(val){
        this.dailyAlarmSettings.forEach(element => {
          element.phone=val
        })
        this.changeAllSetting()
      },
      soundLight(val){
        this.dailyAlarmSettings.forEach(element => {
          element.soundLight=val
        })
        this.changeAllSetting()
      },
      email(val){
        this.dailyAlarmSettings.forEach(element => {
          element.email=val
        })
        this.changeAllSetting()
      },
    },
    methods: {
      openDialog(data){
        this.dailyAlarmSettingForm={...data}
        this.dialogVisible=true
        this.$nextTick(()=>this.$refs.dailyAlarmSettingForm.clearValidate())
      },
      handleDialog() {
        let ruleFlag=false
        this.$refs.dailyAlarmSettingForm.validate(valid => {
          if (valid) {
              ruleFlag=true
          } else {
              ruleFlag=false
              return false
          }
        })
        if(ruleFlag){
          this.dialogVisible = false
          this.query.updateDailyAlarmSetting(this.dailyAlarmSettingForm)
          .then(()=>this.getDailyAlarmSettings())
        }
      },
      getDailyAlarmSettings(){
        // this.dailyAlarmSettings.splice(0,this.dailyAlarmSettings.length)
        return this.query.getDailyAlarmSettings()
        .then(data=>
          this.dailyAlarmSettings=data
        )
      },
      getEmailSetting(){
        // this.dailyAlarmSettings.splice(0,this.dailyAlarmSettings.length)
        return this.query.getEmailSetting()
        .then(data=>
          this.emailSetting=data
        )
      },
      changeAllSetting(){
        Promise.all(this.dailyAlarmSettings.map(element=>this.query.updateDailyAlarmSetting(element)))
        .catch(
          ()=>this.query.getDailyAlarmSettings()
        )
      },
      openEmailDialog(){
        this.emailSettingForm={...this.emailSetting}
        this.emailDialogVisible=true
        this.$nextTick(()=>this.$refs.emailForm.clearValidate())
      },
      handleEmailDialog(){
        let ruleFlag=false
        this.$refs.emailForm.validate((valid) => {
            if (valid) {
                ruleFlag=true
            } else {
                ruleFlag=false
                return false
            }
        })
        if(ruleFlag){
            this.emailDialogVisible = false
            if(this.emailSettingForm.type===1)
              this.emailSettingForm.from+='@qq.com'
            else
              this.emailSettingForm.from+='@163.com'
            this.query.updateEmailSetting(this.emailSettingForm).then(()=>this.getEmailSetting())
        }
      }
    },
    created(){
      this.getDailyAlarmSettings()
      this.getEmailSetting()
    }
}
</script>
<style>
    @import '~@/css/page.css';
    @import '~@/css/components/base/tab/base-dialog-group.css';
    @import '../css/alarm.css';
</style>