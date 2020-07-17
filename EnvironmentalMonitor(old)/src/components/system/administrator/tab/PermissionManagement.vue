<template>
    <div class="ctm-content">
        <div class="ctm-container ctm-container_flex_row">
			<div class="ctm-content ctm-content__main ctm-content__main_open">			
				<div class="ctm-container ctm-container_flex_column">					
                    <div class="ctm-manage-table">
                        <base-management-table-operation :keyword.sync="keyword" @openDialog="openDialog" @refresh="refresh"></base-management-table-operation>                        

                        <el-table :data="permissionsToBeShown" border style="width: 100%" size="mini" height="calc(100% - 48px)">
                            <el-table-column prop="name" label="权限名称" min-width="50" align="center" head-align="center"></el-table-column>
                            <el-table-column prop="url" label="路径" min-width="100" align="center" head-align="center"></el-table-column>                                                      
                            <el-table-column  label="操作" align="center" head-align="center" min-width="100" v-if="hasPermission">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="openDialog('update',scope.row)">编辑</el-button>
                                    <el-button size="mini" type="danger" @click="deletePermission(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <base-table-pagination ref="pagination" :total="permissionsToBeFiltered.length" :pageSize.sync="pageSize" :currentPage.sync="currentPage"></base-table-pagination>
                    <!-- <base-table-pagination ref="pagination" :total="permissionsToBeFiltered.length"></base-table-pagination> -->
				</div>
			</div>
		</div>

        <el-dialog :title="dialogMode=='add'?'权限添加':'权限编辑'" :visible.sync="dialogVisible" width="480px" center custom-class="ctm-dialog">              
            <el-form ref="permissionForm" :model="permissionForm" :rules="permissionFormRules" label-width="80px" size="small">
                <el-form-item label="权限名称" prop="name">
                    <el-input v-model.trim="permissionForm.name" type="text" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="权限路径" prop="url">
                    <el-input v-model.trim="permissionForm.url" type="text" style="width:80%;"></el-input>
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

    </div>
</template>
<script>
import permissionQuery from '@/js/query/system/permissionQuery.js'

export default{
    data(){
        return {
            dialogMode:'',
            keyword:'',
            pageSize:10,
            currentPage:1,
            dialogVisible:false,
            permissionForm:{},
            permissionFormRules:{
                name:[
                    { required: true, message: '请输入名字'},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                url:[
                    { required: true, message: '请输入url'},
                    { min: 3,  message: '长度大于 3 个字符', trigger: 'blur' }
                ]
            },
            permissionQuery:permissionQuery,
            // roleTagStyle:['','success','info','warning','danger'],
        }           
    },
    props:['permissions'],
    computed:{
        permissionsToBeFiltered(){
            if(!this.permissions)
                return []
            return Object.values(this.permissions).filter(permission=>
                {
                    for(let i in permission){
                        if(permission[i].toString().indexOf(this.keyword)!=-1)
                            return true
                    }
                    return false
                }
            )
        },
        permissionsToBeShown(){
            return this.permissionsToBeFiltered.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
    },
    methods:{
        refresh(){
            this.build(true)
            .then(()=>this.$message.success('刷新成功'))
            .catch(()=>this.$message.error('刷新失败'))
        },
        build(enforce=false){
            return this.getPermissions(enforce)
        },
        openDialog(mode,data){
            this.dialogMode=mode
            if(mode==='update')
                this.permissionForm={...data}
            else
                this.permissionForm={}
            this.dialogVisible = true
            this.$nextTick(()=>this.$refs.permissionForm.clearValidate())
        },
        handleDialog(){
            let ruleFlag=false
            this.$refs.permissionForm.validate((valid) => {
                if (valid) {
                    ruleFlag=true
                } else {
                    ruleFlag=false
                    return false
                }
            })
            if(ruleFlag){
                this.dialogVisible = false
                if(this.dialogMode==='add'){
                    this.permissionQuery.addPermission(this.permissionForm)
                    .then(()=>this.build(true))
                }else{
                    this.permissionQuery.updatePermission(this.permissionForm)
                    .then(()=>this.build(true))
                }
            }
        },
        deletePermission(id){
            this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=>this.permissionQuery.deletePermission(id))
            .then(()=>this.build(true))
        },
        getPermissions(enforce){
            if(!enforce&&this.permissions)
                return
            return this.permissionQuery.getPermissions()
            .then(data=>{
                    let permissions={}
                    data.forEach(el=>permissions[el.id]=el)
                    this.$emit("update:permissions",permissions)
                }
            )
        },
    },
    created(){
        this.build()
    }
}

</script>
<style>
   @import '~@/css/page.css';
   @import '~@/css/components/base/tab/base-dialog-group.css';
   @import '~@/css/components/base/tab/base-manage-table.css';
</style>