<template>
    <div class="ctm-content">
        <div class="ctm-container ctm-container_flex_row">
            <base-group-sidetree :sidetreeOpen.sync="sidetreeOpen" :groups="groups" :selectedAccounts.sync="selectedAccounts"></base-group-sidetree>

			<div :class="['ctm-content ctm-content__main',sidetreeOpen?'ctm-content__main_close':'ctm-content__main_open']">
				<div class="ctm-container ctm-container_flex_column">					
                    <div class="ctm-manage-table">
                        <base-management-table-operation :keyword.sync="keyword" @openDialog="openDialog" @refresh="refresh"></base-management-table-operation>
                        
                        <el-table :data="accountToBeShown" border style="width: 100%" size="mini" height="calc(100% - 48px)">
                            <el-table-column prop="username" label="用户名" min-width="50" align="center" head-align="center"></el-table-column>
                            <el-table-column prop="groupName" label="组名" min-width="50" align="center" head-align="center"></el-table-column>
                            <el-table-column label="角色类型" min-width="200" align="center" head-align="center">
                                <template slot-scope="scope">
                                    <!-- <el-tag v-for="roleConnection in scope.row.roleConnections" :key="roleConnection.id" style="margin-left:10px;" 
                                    :type="roleTagStyle[roleConnection.roleId%(roleTagStyle.length-1)]">
                                        {{roles[roleConnection.roleId].name}}
                                    </el-tag> -->
                                    <el-tag v-for="role in scope.row.roles" :key="role.id" style="margin-left:10px;" 
                                    :type="roleTagStyle[role.id%(roleTagStyle.length-1)]">
                                        {{role.name}}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="telephone" label="电话"  min-width="100" align="center" head-align="center"></el-table-column>
                            <el-table-column prop="email" label="邮箱"  min-width="130" align="center" head-align="center"></el-table-column>
                            <!-- <el-table-column prop="workdays" label="值班日" align="center" min-width="240" head-align="center"></el-table-column> -->
                            <el-table-column  label="操作" align="center" head-align="center" min-width="100" v-if="hasPermission">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="openDialog('update',scope.row)">编辑</el-button>
                                    <el-button size="mini" type="danger" @click="deleteAccount(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <base-table-pagination :total="accountsToBeFiltered.length" :pageSize.sync="pageSize"  :currentPage.sync="currentPage"></base-table-pagination>
				</div>
			</div>
		</div>

        <el-dialog :title="dialogMode=='add'?'用户添加':'用户编辑'" :visible.sync="dialogVisible" width="480px" center custom-class="ctm-dialog">              
            <el-form ref="accountForm" :model="accountForm" :rules="accountFormRules" label-width="80px" size="small">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model.trim="accountForm.username" type="text" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="所属分组" prop="groupId">
                    <el-cascader :options="$store.getters.groups" :props="groupsProps" placeholder="请选择分组" v-model="accountForm.groupId">
                        <template slot-scope="{ node, data }">
                        <span>{{ data.name }}</span>
                        </template>
                    </el-cascader>
                </el-form-item>   
                <el-form-item label="密码" prop="password">
                    <el-input v-model.trim="accountForm.password" :placeholder="dialogMode==='add'?'请输入密码':'不修改密码则无需填写'" type="password" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordAgain">
                    <el-input v-model.trim="accountForm.passwordAgain" :placeholder="dialogMode==='add'?'请输入密码':'不修改密码则无需填写'" type="password" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="telephone">
                    <el-input v-model="accountForm.telephone" type="tel" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="accountForm.email" type="email" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="角色管理">
                    <!-- <el-tag v-for="roleConnection in accountForm.roleConnections" :key="roleConnection.id" style="margin-left:10px;"
                    closable :type="roleTagStyle[roleConnection.roleId%(roleTagStyle.length-1)]" @close="handleClose(roleConnection.id)">
                        {{roles[roleConnection.roleId].name}}
                    </el-tag> -->
                    <!-- <el-tag v-for="role in accountForm.roles" :key="role.id" style="margin-left:10px;margin-bottom:5px;" 
                        closable :type="roleTagStyle[role.id%(roleTagStyle.length-1)]">
                        {{role.name}}
                    </el-tag>
                    <el-select placeholder="请选择" ref="roleSelect" v-if="chooseRole" style="margin-left:10px;margin-bottom:5px;" :automatic-dropdown="true">
                        <el-option v-for="role in roles" :label="role.name" :key="role.name" :value="role"></el-option>
                    </el-select> -->
                    <el-select v-model="accountForm.roles" multiple placeholder="请选择" value-key="id">
                        <el-option v-for="role in roles" :key="role.name" 
                        :label="role.name" :value="role">
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
import {initGroupsReflect,deepClone} from '@/js/util/util.js'
import userQuery from '@/js/query/system/userQuery.js'
import roleQuery from '@/js/query/system/roleQuery.js'

// const passwordPass=(rule,value,callback)=>{
//   if(value==='')
//       callback(new Error('请输入'))
//   else if(value!==this.accountForm.password)
//       callback(new Error('两次密码不相同'))
//   else
//       callback()
// }

const telephonePass=(rule,value,callback)=>{
    if(value==='')
      callback(new Error('请输入数值'))
  else if(!(/^\d{11}$/.test(value)))
      callback(new Error('手机格式不正确'))
  else
      callback()
}

export default{
    data(){
        return {
            sidetreeOpen:true,
            dialogMode:'',
            keyword:'',
            selectedAccounts:[],
            pageSize:10,
            currentPage:1,
            dialogVisible:false,
            accountForm:{},
            accountFormRules:{
                username:[
                    { required: true, message: '请输入名字'},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                groupId:[
                    { required: true, message: '请选择分组'}
                ],
                password:[
                    // { required: true, message: '请输入密码'},
                    // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    { validator:null} //在created中赋值
                ],
                passwordAgain:[
                    { validator: null}, //在created中赋值
                ],
                telephone:[
                    { required: true, validator: telephonePass},
                ],
                email:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            },
            groupsProps:{label:'name',children:'group',value:'groupId',emitPath:false},
            accounts:{},
            groups:[],
            groupsReflect:{},
            userQuery:userQuery,
            roleQuery:roleQuery,
            connections:[],
            roleTagStyle:['','success','info','warning','danger'],
        }           
    },
    props:['roles'],
    computed:{
        accountsToBeFiltered(){
            return this.selectedAccounts.filter(account=>
                {
                    for(let i in account){
                        if(account[i].toString().indexOf(this.keyword)!=-1)
                            return true
                    }
                    return false
                }
            )
        },
        accountToBeShown(){
            return this.accountsToBeFiltered.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
    },
    methods:{
        refresh(){
            this.build()
            .then(()=>this.$message.success('刷新成功'))
            .catch(()=>this.$message.error('刷新失败'))
        },
        getAccounts(){
            this.accounts={}
            return this.userQuery.getAccounts()
            .then(data=> data.forEach(el=>this.accounts[el.id]=el))
            // .then(data=>this.accounts=data)
        },
        // filterRoleId(value, row) {
        //     return row.roleId === value;
        // },
        build(enforce=false){
            return Promise.all([this.getAccounts(),this.$store.dispatch('group/updateGroups',true),this.getConnectionsWithRole(),this.getRoles(enforce)])
            .then(()=>{
                this.groups=deepClone(this.$store.getters.groups)
                initGroupsReflect(this.groups[0],this.groupsReflect)
                this.addAccountToGroup(this.accounts,this.groupsReflect)
                this.addRolesToAccount(this.connections,this.accounts,this.roles)
                this.connetions=null
                this.selectedAccounts=Object.values(this.accounts)
            })
        },
        addAccountToGroup(accounts,groupsReflect){
            Object.values(accounts).forEach(element=>{
                if(!groupsReflect[element.groupId].accounts)
                    groupsReflect[element.groupId].accounts=[]
                groupsReflect[element.groupId].accounts.push(element)
                element.groupName=groupsReflect[element.groupId].name
            })
        },
        // addRolesConnectionToAccount(connections,accounts){
        //     connections.forEach(con=>{
        //         if(!accounts[con.accountId].roleConnections)
        //             accounts[con.accountId].roleConnections=[]
        //         accounts[con.accountId].roleConnections.push(con)
        //     })
        // },
        addRolesToAccount(connections,accounts,roles){
            connections.forEach(con=>{
                if(!accounts[con.accountId].roles)
                    accounts[con.accountId].roles=[]
                accounts[con.accountId].roles.push(roles[con.roleId])
            })
        },
        openDialog(mode,data){
            this.dialogMode=mode
            if(mode==='update'){
                this.accountForm={...data}
                // this.accountForm.passwordAgain=data.password
            }else
                this.accountForm={}
            this.dialogVisible = true
            this.$nextTick(()=>this.$refs.accountForm.clearValidate())
        },
        handleDialog(){
            let ruleFlag=false
            this.$refs.accountForm.validate((valid) => {
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
                    let roleIds=this.accountForm.roles.map(el=>el.id)
                    this.userQuery.addAccount(this.accountForm)
                    .then(data=>{
                            if(data.zt==="error"){
                                this.$message.error("插入异常，请检查名字是否已存在")
                                Promise.reject()
                            }
                            this.userQuery.updateAccountWithRole(data.id,roleIds)
                        }
                    )
                    .then(()=>this.build(true))
                }else{
                    let roleIds=this.accountForm.roles.map(el=>el.id)
                    this.userQuery.updateAccount(this.accountForm)
                    .then(()=>this.userQuery.updateAccountWithRole(this.accountForm.id,roleIds))
                    .then(()=>this.build(true))
                }
            }
        },
        deleteAccount(id){
            this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=>this.userQuery.deleteAccount(id))
            .then(()=>this.build(true))
        },
        getRoles(enforce){
            if(!enforce&&this.roles)
                return
            return this.roleQuery.getRoles()
            .then(data=>{
                    let roles={}
                    data.forEach(el=>roles[el.id]=el)
                    this.$emit("update:roles",roles)
                }
            )
        },
        getConnectionsWithRole(){
            return this.userQuery.getConnectionsWithRole()
            .then(data=>this.connections=data)
        },
        passwordPass(rule,value,callback){
            if(this.dialogMode==='add'||(this.dialogMode==='update'&&value)){
                if(!value)
                    callback(new Error('请再次输入密码'))
                else if(value.length<3||value.length>10)
                    callback(new Error('长度在 3 到 10 个字符'))
                else
                    callback()
            }else{
                callback()
            }
        },
        passwordAgainPass(rule,value,callback){
            if(this.dialogMode==='add'||(this.dialogMode==='update'&&this.accountForm.password)){
                if(!value)
                    callback(new Error('请再次输入密码'))
                else if(value!==this.accountForm.password)
                    callback(new Error('两次密码不相同'))
                else
                    callback()
            }else{
                callback()
            }
        },
    },
    created(){
        this.build()
        this.accountFormRules.passwordAgain[0].validator=this.passwordAgainPass
        this.accountFormRules.password[0].validator=this.passwordPass
    }
}

</script>
<style>
   @import '~@/css/page.css';
   @import '~@/css/components/base/tab/base-dialog-group.css';
   @import '~@/css/components/base/tab/base-manage-table.css';
</style>