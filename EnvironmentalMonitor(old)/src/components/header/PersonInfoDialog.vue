<template>
    <el-dialog title="编辑个人信息" :visible.sync="dialogVisible" width="520px" center custom-class="ctm-dialog">              
        <el-form ref="personInfoForm" :model="personInfo" :rules="personInfoFormRules" label-width="80px" size="small">
            <el-form-item label="用户名" prop="username">
                <el-input v-model.trim="personInfo.username" type="text" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="所属分组" prop="groupId">
                <el-cascader :options="$store.getters.groups" :props="groupsProps" placeholder="请选择分组" v-model="personInfo.groupId">
                    <template slot-scope="{ node, data }">
                        <span>{{ data.name }}</span>
                    </template>
                </el-cascader>
            </el-form-item>   
            <el-form-item label="密码" prop="password">
                <el-input v-model.trim="personInfo.password" placeholder="不修改密码则无需填写" type="password" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordAgain">
                <el-input v-model.trim="personInfo.passwordAgain" placeholder="不修改密码则无需填写" type="password" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="telephone">
                <el-input v-model="personInfo.telephone" type="tel" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="personInfo.email" type="email" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="角色管理" v-if="hasPermission">
                <el-select v-model="personInfo.roles" multiple placeholder="请选择" value-key="id">
                    <el-option v-for="role in roles" :key="role.id" 
                    :label="role.name" :value="role">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <div style="width:50%;">
                <button @click="handleDialog" class="create">确 定</button>
            </div>
            <div style="width:50%;">
                <button @click="dialogVisible=false" class="cancel">取 消</button>
            </div>                    
        </span>
    </el-dialog>
</template>
<script>
import userQuery from '@/js/query/system/userQuery.js'
import roleQuery from '@/js/query/system/roleQuery.js'

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
        return{
            dialogVisible:false,
            personInfo:{},
            personInfoFormRules:{
                username:[
                    { required: true, message: '请输入名字'},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                groupId:[
                    { required: true, message: '请选择分组'}
                ],
                password:[
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
            roles:{}
        }
    },
    watch:{
        dialogVisible(value){
            if(value)
                this.openDialog()
        }
    },
    methods:{
        async openDialog(){
            // await this.$store.dispatch('group/updateGroups')
            // console.log(g)
            // console.log(Object.keys(this.personInfo).length)
            if(!this.personInfo.username){
                this.personInfo=await userQuery.getAccountsByName(this.$store.getters.name)
                let connections=await userQuery.getConnectionsWithRole()
                connections=connections.filter(con=>this.personInfo.id===con.accountId)
                let roles=await roleQuery.getRoles()
                roles.forEach(r=>this.roles[r.id]=r)
                this.$set(this.personInfo,'roles',[])
                connections.forEach(con=>this.personInfo.roles.push(this.roles[con.roleId]))
                // this.$nextTick()
                // connections.forEach(con=>this.personInfo.id===con.accountId)
                this.$nextTick(()=>this.$refs.personInfoForm.clearValidate())
            }
        },
        async handleDialog(){
            let ruleFlag=false
            this.$refs.personInfoForm.validate((valid) => {
                if (valid) {
                    ruleFlag=true
                } else {
                    ruleFlag=false
                    return false
                }
            })
            if(ruleFlag){
                this.dialogVisible=false
                let roleIds=this.personInfo.roles.map(el=>el.id)
                await userQuery.updateAccount(this.personInfo)
                userQuery.updateAccountWithRole(this.personInfo.id,roleIds)
                this.$message.warning("若修改名字或密码请重新登录")
                this.$store.commit('role/UPDATE_NAME',this.personInfo.username)
                this.$store.dispatch('role/updateRole',this.$store.getters.name)
                this.personInfo={}
            }
        },
        passwordPass(rule,value,callback){
            if(value){
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
            if(this.personInfo.password){
                if(!value)
                    callback(new Error('请再次输入密码'))
                else if(value!==this.personInfo.password)
                    callback(new Error('两次密码不相同'))
                else
                    callback()
            }else{
                callback()
            }
        },
    },
    created(){
        this.$store.dispatch('group/updateGroups')
        this.personInfoFormRules.passwordAgain[0].validator=this.passwordAgainPass
        this.personInfoFormRules.password[0].validator=this.passwordPass
    }
}
</script>
<style>
    @import '~@/css/components/base/tab/base-dialog-group.css';
</style>