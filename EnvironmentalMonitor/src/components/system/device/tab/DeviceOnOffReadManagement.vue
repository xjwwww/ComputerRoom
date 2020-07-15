<template>
<!-- 8052设备 -->
    <div class="ctm-container ctm-container_flex_row">
        <base-group-sidetree :sidetreeOpen.sync="sidetreeOpen" :groups="groups" :selectedDevices.sync="selectedDevices"></base-group-sidetree>

        <div :class="['ctm-content ctm-content__main',sidetreeOpen?'ctm-content__main_close':'ctm-content__main_open']">
            <div class="ctm-container ctm-container_flex_column">
                <div class="ctm-manage-table">
                    <base-management-table-operation :keyword.sync="keyword" @openDialog="openDialog" @refresh="refresh"></base-management-table-operation>                    

                    <el-table :data="deviceSettingsToBeShown" border style="width: 100%" size="mini" height="calc(100% - 48px)">
                        <el-table-column prop="address" label="设备地址" min-width="30" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="channel" label="设备通道" min-width="30" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="groupName" label="所在分组" min-width="50" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="name" label="设备名称" min-width="50" align="center" head-align="center"></el-table-column>
                        <el-table-column label="IP地址" min-width="80" align="center" head-align="center">
                            <template slot-scope="scope">
                                {{ipMap[scope.row.ipId].address}}:{{ipMap[scope.row.ipId].port}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作"  align="center" head-align="center" min-width="100" v-if="hasPermission">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="openDialog('update',scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="deleteOperation(scope.row.deviceId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <base-table-pagination :total="deviceSettingsToBeFiltered.length" :pageSize.sync="pageSize"  :currentPage.sync="currentPage"></base-table-pagination>
            </div>
        </div>

        <el-dialog :title="dialogMode==='add'?'设备添加':'修改设备'" :visible.sync="deviceDialogVisible" width="400px" center custom-class="ctm-dialog">
            <el-form ref="deviceForm" :rules="deviceFormRules" :model="deviceForm"  label-width="80px" size="small">
              <el-form-item label="设备地址" prop="address">
                <el-select v-model="deviceForm.address" placeholder="请选择" style="width:90%;" :disabled="dialogMode==='add'?false:true">
                    <el-option v-for="item in 20" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备通道" prop="channel">
                <el-select v-model="deviceForm.channel" placeholder="请选择" style="width:90%;" :disabled="dialogMode==='add'?false:true">
                    <el-option v-for="item in channels" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属分组" prop="groupId">
                <el-cascader :options="this.$store.getters.groups" :props="groupsProps" placeholder="选择分组" v-model="deviceForm.groupId" style="width:90%;" :disabled="dialogMode==='add'?false:true">
                    <template slot-scope="{ node, data }">
                      <span>{{ data.name }}</span>
                    </template>
                </el-cascader>
              </el-form-item>
              <el-form-item label="IP端口" v-show="dialogMode==='add'" prop="ipId">
                <el-select v-model="deviceForm.ipId" placeholder="请选择" style="width:90%;" :disabled="dialogMode==='add'?false:true">
                    <el-option v-for="item in ipMap" :key="item.id" :label="item.address+':'+item.port" :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择设备" v-show="dialogMode==='add'" prop="deviceTypeId">
                <el-select v-model="deviceForm.deviceTypeId" placeholder="请选择" style="width:90%;" :disabled="dialogMode==='add'?false:true">
                    <el-option v-for="item in deviceType" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备名称" prop="name">
                <el-input v-model="deviceForm.name" type="text" style="width:90%;"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <div style="width:50%;">
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
import query from '@/js/query/system/onOffReadQuery.js'

export default {
    data(){
        return{
            sidetreeOpen:true,
            dialogMode:'',
            keyword:'',
            selectedDevices:[],
            pageSize:10,
            currentPage:1,
            deviceDialogVisible:false,
            deviceForm:{},
            deviceFormRules:{
                address:[
                    { required: true, message: '请选择地址'}
                ],
                channel:[
                    { required: true, message: '请选择通道'}
                ],
                groupId:[
                    { required: true, message: '请选择分组'}
                ],
                ipId:[
                    { required: true, message: '请选择ip地址'}
                ],
                deviceTypeId:[
                    { required: true, message: '请选择设备类型'}
                ],
                name:[
                    { required: true, message: '请输入名称'}
                ],
            },
            channels:['DI0','DI1','DI2','DI3','DI4','DI5','DI6','DI7'],
            groupsProps:{label:'name',children:'group',value:'groupId',emitPath:false},
            devices:[],
            ipMap:{},
            groups:[],
            groupsReflect:{},
            deviceType:[]
        }
    },
    methods:{
        refresh(){
            this.build()
            .then(()=>this.$message.success('刷新成功'))
            .catch(()=>this.$message.error('刷新失败'))
        },
        openDialog(mode,data){
            this.dialogMode=mode
            if(mode==='update')
                this.deviceForm={...data}
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
                this.deviceDialogVisible = false
                if(this.dialogMode==='add')
                    query.addDevice(this.deviceForm).then(()=>this.build())
                else
                    query.updateDevice(this.deviceForm).then(()=>this.build())
            }
        },
        build(){
            return Promise.all([this.getDevice(),this.getIps(),this.$store.dispatch('group/updateGroups')])
            .then(()=>{
                this.groups=deepClone(this.$store.getters.groups)
                initGroupsReflect(this.groups[0],this.groupsReflect)
                addDeviceToGroup(this.devices,this.groupsReflect)
                this.selectedDevices=this.devices
            })
        },
        getDevice(){
            return query.getDevice()
            .then(data=>{
                this.devices=data
                })
        },
        deleteOperation(id){
            this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=>query.deleteDevice(id))
            .then(()=>this.build())
        },
        getDeviceType(){
            return query.getDeviceType()
            .then(data=>this.deviceType=data)
        },
        getIps(){
            return query.getIps()
            .then(
                ips=>{
                    for(let i in ips)
                        this.ipMap[ips[i].id]=ips[i]
                }
            )
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
        deviceSettingsToBeShown(){
            return this.deviceSettingsToBeFiltered.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
    },
    created(){
        this.build()
        this.getDeviceType()
    }
}
</script>
<style>
    @import '~@/css/page.css';
    @import '~@/css/components/base/tab/base-dialog-group.css';
    @import '~@/css/components/base/tab/base-manage-table.css';
</style>