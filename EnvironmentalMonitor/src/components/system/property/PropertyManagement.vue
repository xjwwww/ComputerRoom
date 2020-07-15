<template>
    <div class="ctm-container ctm-container_flex_row">
        <base-group-sidetree :sidetreeOpen.sync="sidetreeOpen" :groups="groups" :selectedDevices.sync="selectedDevices"></base-group-sidetree>

        <div :class="['ctm-content ctm-content__main',sidetreeOpen?'ctm-content__main_close':'ctm-content__main_open']">
            <div class="ctm-container ctm-container_flex_column">
                <div class="ctm-manage-table">
                    <base-management-table-operation :keyword.sync="keyword" @openDialog="openDialog" @refresh="refresh"></base-management-table-operation>
                    
                    <el-table :data="deviceSettingsToBeShown" border style="width: 100%" size="mini" height="calc(100% - 48px)">
                        <el-table-column prop="channel" label="设备通道" min-width="50" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="name" label="设备名称" min-width="80" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="propertyName" label="所在资产" min-width="80" align="center" head-align="center"></el-table-column>
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

        <el-dialog :title="dialogMode=='add'?'设备添加':'设备编辑'" :visible.sync="deviceDialogVisible" width="400px" center custom-class="ctm-dialog">
            <el-form ref="deviceForm" :model="deviceForm" :rules="deviceFormRules" label-width="80px" size="small">
              <el-form-item label="设备地址" prop="channel">
                <el-select v-model="deviceForm.channel" placeholder="请选择" style="width:90%;" :disabled="dialogMode==='add'?false:true">
                    <el-option v-for="item in 20" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备名称" prop="name">
                <el-input v-model="deviceForm.name" type="text" style="width:90%;"></el-input>
              </el-form-item>
              <el-form-item label="资产管理" v-show="dialogMode==='add'" prop="propertyId">
                <el-select v-model="deviceForm.propertyId" placeholder="请选择" style="width:90%;" :disabled="dialogMode==='add'?false:true">
                    <el-option v-for="item in properties" :key="item.propertyId" :label="item.name" :value="item.propertyId">
                    </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="设备协议">
                <el-select v-model="deviceForm.protocolId" placeholder="请选择" style="width:90%;">
                    <el-option v-for="item in protocols" :key="item.id" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item> -->
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
import query from '@/js/query/system/propertyQuery.js'

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
                channel:[
                    { required: true, message: '请选择地址'}
                ],
                name:[
                    { required: true, message: '输入名字'},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                propertyId:[
                    { required: true, message: '请选择管理分组'}
                ],

            },
            groupsProps:{label:'name',children:'group',value:'groupId',emitPath:false},
        }
    },
    props:['groups','devices','properties'],
    methods:{
        refresh(){
            this.getIps()
            this.$emit("transferBuild")
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
            this.$refs.deviceForm.validate(valid => {
                if (valid) {
                    ruleFlag=true
                } else {
                    ruleFlag=false
                    return
                }
            })
            if(ruleFlag){
                this.deviceDialogVisible = false
                if(this.dialogMode==='add')
                    query.addDevice(this.deviceForm).then(()=>this.$emit("transferBuild"))
                else
                    query.updateDevice(this.deviceForm).then(()=>this.$emit("transferBuild"))
            }
        },
        deleteOperation(id){
            this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=>query.deleteDevice(id))
            .then(()=>this.$emit("transferBuild"))
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
        this.selectedDevices=this.devices
    }
}
</script>
<style>
    @import '~@/css/page.css';
    @import '~@/css/components/base/tab/base-dialog-group.css';
    @import '~@/css/components/base/tab/base-manage-table.css';
</style>