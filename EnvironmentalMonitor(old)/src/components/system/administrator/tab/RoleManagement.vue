<template>
    <div class="ctm-content">
        <div class="ctm-container ctm-container_flex_row">
			<div class="ctm-content ctm-content__main ctm-content__main_open">
				<div class="ctm-container ctm-container_flex_column">					
                    <div class="ctm-manage-table">
                        <base-management-table-operation :keyword.sync="keyword" @openDialog="openDialog" @refresh="refresh"></base-management-table-operation>                        

                        <el-table :data="rolesToBeShown" border style="width: 100%" size="mini" height="calc(100% - 48px)">
                            <el-table-column prop="name" label="角色名称" min-width="50" align="center" head-align="center"></el-table-column>
                            <el-table-column prop="description" label="角色描述" min-width="50" align="center" head-align="center"></el-table-column>                            
                            <el-table-column label="拥有权限" min-width="150" align="center" head-align="center">
                                <template slot-scope="scope">
                                    <div v-for="permission in scope.row.permissions" :key="permission.id">{{permission.name}}</div>
                                    <!-- <div>{{scope.row.permission?scope.row.permission[0].name:1}}</div> -->
                                </template>
                            </el-table-column>                            
                            <el-table-column  label="操作" align="center" head-align="center" min-width="100" v-if="hasPermission">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="openDialog('update',scope.row)">编辑</el-button>
                                    <el-button size="mini" type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <base-table-pagination :total="rolesToBeFiltered.length" :pageSize.sync="pageSize"  :currentPage.sync="currentPage"></base-table-pagination>
				</div>
			</div>
		</div>

        <el-dialog :title="dialogMode=='add'?'角色添加':'角色编辑'" :visible.sync="dialogVisible" width="480px" center custom-class="ctm-dialog">              
            <el-form ref="roleForm" :model="roleForm" :rules="roleFormRules" label-width="80px" size="small">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model.trim="roleForm.name" type="text" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input v-model.trim="roleForm.description" type="text" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="拥有权限">
                    <el-select v-model="roleForm.permissions" multiple placeholder="请选择" value-key="id">
                        <el-option v-for="permission in permissions" :key="permission.name" 
                        :label="permission.name" :value="permission">
                        </el-option>
                    </el-select>
                    <!-- <el-button v-else @click="roleSelectShow" style="margin-left:10px;margin-bottom:5px;">添加新角色</el-button> -->
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
import roleQuery from '@/js/query/system/roleQuery.js'
import permissionQuery from '@/js/query/system/permissionQuery.js'

export default{
    data(){
        return {
            dialogMode:'',
            keyword:'',
            pageSize:10,
            currentPage:1,
            dialogVisible:false,
            roleForm:{},
            roleFormRules:{
                name:[
                    { required: true, message: '请输入名字'},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                description:[
                    { required: true, message: '请输入描述'},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ]
            },
            permissionQuery:permissionQuery,
            roleQuery:roleQuery,
            connections:[],
            // roleTagStyle:['','success','info','warning','danger'],
        }           
    },
    props:['roles','permissions'],
    computed:{
        rolesToBeFiltered(){
            return Object.values(this.roles).filter(role=>
                {
                    for(let i in role){
                        if(role[i].toString().indexOf(this.keyword)!=-1)
                            return true
                    }
                    return false
                }
            )
        },
        rolesToBeShown(){
            return this.rolesToBeFiltered.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
    },
    methods:{
        refresh(){
            this.build(true)
            .then(()=>this.$message.success('刷新成功'))
            .catch(()=>this.$message.error('刷新失败'))
        },
        getRoles(enforce){
            if(!enforce&&this.roles)
                return
            let roles={}
            return this.roleQuery.getRoles()
            .then(data=> {
                    data.forEach(el=>roles[el.id]=el)
                    this.$emit("update:roles",roles)
                }
            )
        },
        // filterRoleId(value, row) {
        //     return row.roleId === value;
        // },
        build(enforce=false){
            return Promise.all([this.getRoles(enforce),this.getConnectionsWithPermission(),this.getPermissions(enforce)])
            .then(()=>{
                this.addPermissionsToAccount(this.connections,this.permissions,this.roles)
                this.connetions=null
            })
        },
        addPermissionsToAccount(connections,permissions,roles){
            connections.forEach(con=>{
                if(!roles[con.roleId])
                    return
                if(!roles[con.roleId].permissions)
                    this.$set(roles[con.roleId],'permissions',[])
                roles[con.roleId].permissions.push(permissions[con.permissionId]) 
            })
        },
        openDialog(mode,data){
            this.dialogMode=mode
            if(mode==='update')
                this.roleForm={...data}
            else
                this.roleForm={}
            this.dialogVisible = true
            this.$nextTick(()=>this.$refs.roleForm.clearValidate())
        },
        handleDialog(){
            let ruleFlag=false
            this.$refs.roleForm.validate((valid) => {
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
                    this.roleQuery.addRole(this.roleForm)
                    .then(data=>{
                            if(data.zt==="error"){
                                this.$message.error("插入异常")
                                Promise.reject()
                            }
                            return this.roleQuery.updateRole({...this.roleForm,...data})
                        }
                    )
                    .then(({zt})=>{
                        if(zt==='ok')
                            this.$message.success("操作成功")
                        else{
                            this.$message.error("操作失败")
                            Promise.reject()
                        }
                    })
                    .then(()=>this.build(true))
                }else{
                    this.roleQuery.updateRole(this.roleForm)
                    .then(()=>this.build(true))
                }
            }
        },
        deleteRole(id){
            this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=>this.roleQuery.deleteRole(id))
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
        getConnectionsWithPermission(){
            return this.roleQuery.getConnectionsWithPermission()
            .then(data=>this.connections=data)
        },
    },
    created(){
        this.build()
    },
}

</script>
<style>
   @import '~@/css/page.css';
   @import '~@/css/components/base/tab/base-dialog-group.css';
   @import '~@/css/components/base/tab/base-manage-table.css';
</style>