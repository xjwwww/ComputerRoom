<template>
    <div class="ctm-container ctm-container_flex_row">
        <!-- <base-group-sidetree ref="sidetree" :sidetreeOpen="sidetreeOpen" :groups="groups"  @transferSidetreeOpen="getSidetreeOpen" @transferSelectedDevices="getSelectedDevices"></base-group-sidetree> -->
        <base-group-sidetree :sidetreeOpen.sync="sidetreeOpen" :groups="groups" :selectedDevices.sync="selectedDevices"></base-group-sidetree>

        <div :class="['ctm-content ctm-content__main',sidetreeOpen?'ctm-content__main_close':'ctm-content__main_open']">
            <div class="ctm-container ctm-container_flex_column">
                <div class="ctm-manage-table">
                    <base-management-table-operation :keyword.sync="keyword" @openDialog="openDialog" @refresh="refresh"></base-management-table-operation>

                    <el-table :data="deviceSettingsToBeShown" border style="width: 100%" size="mini" height="calc(100% - 48px)">
                        <!-- <el-table-column prop="key" label="序列号" min-width="50" align="center" head-align="center" style="display:none;"></el-table-column> -->
                        <!-- <el-table-column prop="name" label="模块名称" min-width="50" align="center" head-align="center"></el-table-column> -->
                        <el-table-column label="模块名称" min-width="50" align="center" head-align="center">
                            <template slot-scope="scope">
                                {{deviceType!==undefined?deviceType[scope.row.deviceTypeId].name:''}}
                            </template>
                        </el-table-column>                        
                        <el-table-column label="IP地址" min-width="80" align="center" head-align="center">
                            <template slot-scope="scope">
                                {{scope.row.ipAddress}}:{{scope.row.ipPort}}
                            </template>
                        </el-table-column>
                        <el-table-column label="通信状态"  min-width="60" align="center" head-align="center">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.isConnect" :inactive-value="0" :active-value="1" active-text="开启" inactive-text="关闭" @change="connectChange(scope.row)"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作"  align="center" head-align="center" min-width="60" v-if="hasPermission">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="openDialog('update',scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="deleteOperation(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <!-- <base-table-pagination :total="deviceSettingsToBeFiltered.length" @transferPageSize="getPageSize"  @transferCurrentPage="getCurrentPage"></base-table-pagination> -->
                <base-table-pagination :total="deviceSettingsToBeFiltered.length" :pageSize.sync="pageSize"  :currentPage.sync="currentPage"></base-table-pagination>
            </div>
        </div>

        <el-dialog :title="dialogMode==='add'?'设备添加':'修改设备'" :visible.sync="deviceDialogVisible" width="400px" center custom-class="ctm-dialog">
            <el-form ref="deviceForm" :rules="deviceFormRules" :model="deviceForm"  label-width="80px" size="small">
              <el-form-item label="模块名称" prop="deviceTypeId">
                <el-select v-model="deviceForm.deviceTypeId" placeholder="请选择" style="width:90%;" :disabled="dialogMode==='add'?false:true">
                    <el-option v-for="item in deviceType" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="ip地址" prop="ipAddress">
                <el-input v-model="deviceForm.ipAddress" type="text" style="width:90%;"></el-input>
              </el-form-item>
              <el-form-item label="ip端口" prop="ipPort">
                <el-input v-model="deviceForm.ipPort" type="text" style="width:90%;"></el-input>
              </el-form-item>
              <el-form-item label="所属分组" prop="groupId">
                <el-cascader :options="this.$store.getters.groups" :props="groupsProps" placeholder="选择分组" v-model="deviceForm.groupId" style="width:90%;">
                    <template slot-scope="{ node, data }">
                      <span>{{ data.name }}</span>
                    </template>
                </el-cascader>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <div style="width:50%;">
                <!-- <button @click="()=>{deviceDialogVisible = false;handleDialog();}" class="create">确 定</button> -->
                <button @click="handleDialog" class="create">确 定</button>
              </div>
              <div style="width:50%;">
                <button @click="deviceDialogVisible = false" class="cancel">取 消</button>
              </div>                    
            </span>
        </el-dialog>

    </div>
</template>
<script>
import {initGroupsReflect,addDeviceToGroup,deepClone} from '@/js/util/util.js'
import query from '../js/ipQuery.js'


export default {
    data(){
        var ipAddressPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写IP地址'))
            }else if(/^COM\d+$/.test(value)){
                callback()
            }else {
                let ipArray=value.split(".");
                if(ipArray.length!=4)
                    callback(new Error('请按照格式正确填写IP地址'))
                ipArray.forEach((element)=>{
                    let temp=parseInt(element)
                    if((temp>256||temp<0)||temp!=element)
                        callback(new Error('请按照格式正确填写IP地址'))
                })
            }
            callback()
        }
        var ipPortPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写IP端口'))
            } else if(!(/^\d{1,4}$/.test(value))){
                callback(new Error('请按照格式正确填写IP端口'))
            }
            callback()
        }
        return{
            sidetreeOpen:true,
            dialogMode:'',
            keyword:'',
            selectedDevices:[],
            pageSize:10,
            currentPage:1,
            deviceDialogVisible:false,
            deviceForm:{
                // deviceTypeId:1,
                // ipAddress:'',
                // ipPort:'',
                // groupId:'',
            },
            deviceFormRules:{
                deviceTypeId:[
                    { required: true, message: '请选择设备类型'}
                ],
                ipAddress:[
                    { required: true, validator: ipAddressPass, trigger: 'blur' }
                ],
                ipPort:[
                    { required: true, validator: ipPortPass, trigger: 'blur' }
                ],
                groupId:[
                    { required: true, message: '请选择分组'}
                ]
            },
            groupsProps:{label:'name',children:'group',value:'groupId',emitPath:false},
            devices:[],
            groups:[],
            groupsReflect:{},
            deviceType:undefined
        }
    },
    methods:{
        refresh(){
            this.build()
            .then(()=>this.$message.success('刷新成功'))
            .catch(()=>this.$message.error('刷新失败'))
        },
        connectChange(device){
            query.updateIpConnect(device.deviceId,device.isConnect)
            .catch(()=>device.isConnect=!device.isConnect)
        },
        openDialog(mode,data){
            this.dialogMode=mode
            if(mode==='update'){
                if(data.isConnect){
                    this.$message.error("修改前请先关闭通信")
                    return
                }
                this.deviceForm={...data}
            }
            else
                this.deviceForm={}
            this.deviceDialogVisible = true
            this.$nextTick(()=>this.$refs.deviceForm.clearValidate())
        },
        handleDialog(){
            let ruleFlag=false
            this.$refs.deviceForm.validate((valid) => {
                if (valid) {
                    ruleFlag=true
                } else {
                    ruleFlag=false
                    return false
                }
            })
            if(ruleFlag){
                let ipFlag=true
                this.devices.forEach(({ipAddress,ipPort,deviceId})=>{
                    if(this.deviceForm.ipAddress===ipAddress&&this.deviceForm.ipPort==ipPort){
                        if(this.deviceForm.deviceId!==deviceId){
                            this.$alert("该ip已被使用，请修改ip地址或端口号",{
                                confirmButtonText: '确定',
                            })
                            ipFlag=false
                            return
                        }
                    }
                })
                if(ipFlag){
                    this.deviceDialogVisible = false
                    if(this.dialogMode==='add')
                        query.addDevice(this.deviceForm).then(()=>this.build())
                    else
                        query.updateDevice(this.deviceForm).then(()=>this.build()) 
                }
            }
        },
        deleteOperation(data){
            if(data.isConnect){
                this.$message.error("删除前请先关闭通信")
                return
            }
            this.$confirm('此操作将永久删除该ip以及ip对应的设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=>query.deleteDevice(data.deviceId))
            .then(()=>this.build())
        },
        getDevices(){
            return query.getDevices()
            .then(data=>{
                    this.devices=data //一开始显示所有设备，默认树控件中的“全部”被选中
                    console.log(data);
                }
            )
        },
        build(){
            return Promise.all([this.getDevices(),this.$store.dispatch('group/updateGroups',true)])
            .then(()=>{
                this.groups=deepClone(this.$store.getters.groups)
                initGroupsReflect(this.groups[0],this.groupsReflect)
                addDeviceToGroup(this.devices,this.groupsReflect)
                this.selectedDevices=this.devices
            })
        },
        getDeviceType(){
            return query.getDeviceType()
            .then(data=>this.deviceType=data)
        },
    },
    computed:{
        deviceSettingsToBeFiltered(){
            return this.selectedDevices.filter(device=>
                {
                    for(let i in device){
                        if(device[i].toString().indexOf(this.keyword)!=-1)
                            return true
                    }
                    return false
                }
            )
        },
        deviceSettingsToBeShown(){1
            return this.deviceSettingsToBeFiltered.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
    },
    created(){
        this.build()
        this.getDeviceType()
    },
}
</script>
<style>
    @import '~@/css/page.css';
    @import '~@/css/components/base/tab/base-dialog-group.css';
    @import '~@/css/components/base/tab/base-manage-table.css';
</style>