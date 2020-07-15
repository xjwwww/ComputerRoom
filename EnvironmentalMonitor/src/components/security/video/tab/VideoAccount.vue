<template>
    <div class="video-operation-well video-operation-well_funciton_preview">
        <el-form ref="accountForm" :model="accountForm" :rules="accountFormRules" label-width="80px" size="mini" :inline="true">
            <el-form-item label="ip地址" prop="szIP">
                <el-input v-model.trim="accountForm.szIP" style="width:90%;"></el-input>
            </el-form-item> 
            <el-form-item label="ip端口" prop="szPort">
                <el-input v-model.trim="accountForm.szPort" style="width:90%;"></el-input>
            </el-form-item>
            <el-form-item label="账号名称" prop="szUsername">
                <el-input v-model.trim="accountForm.szUsername" style="width:90%;"></el-input>
            </el-form-item>
            <el-form-item label="账号密码" prop="szPassword">
                <el-input v-model.trim="accountForm.szPassword" type="password" style="width:90%;"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="szPasswordAgain">
                <el-input v-model.trim="accountForm.szPasswordAgain" type="password" style="width:90%;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleForm">保存修改</el-button>
                <el-button @click="resetForm">重置信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {notifyMaker} from '../js/Hikvision/videoUtil.js'
import query from '../js/videoQuery.js'

export default {
    data(){
        var ipAddressPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写IP地址'))
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
        var passwordAgain=(rule,value,callback) => {
            if(value===''){
                callback(new Error('请重复输入新密码'))
            }else if(this.accountForm.szPassword==='')
                callback(new Error('请先填写账号密码'))
            else if(value!==this.accountForm.szPassword)
                callback(new Error('密码与新密码不一致'))
            callback()
        }
        return{
            accountForm:{
                id:'',
                szIP: "", 
                szPort: "",
                szUsername: "",
                szPassword: "",
                szPasswordAgain:""
            },
            accountFormRules:{
                szIP: [
                    {require:true,validator: ipAddressPass, trigger: 'blur'}
                ],
                szPort:[
                    { required: true, validator: ipPortPass, trigger: 'blur' }
                ],
                szUsername:[
                    { required: true, message: '请填写信息'}
                ],
                szPassword:[
                    { required: true, message: '请填写信息'}
                ],
                szPasswordAgain:[
                    {require:true,validator: passwordAgain, trigger: 'blur'}
                ]
            },
            dialogVisible:false
        }
    },
    props:['account'],
    methods:{
        handleForm(){
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
                query.updateAccount(this.accountForm)
                .then(()=>{
                    this.$emit("transferRefresh")
                })
            }
        },
        resetForm() {
            this.$refs['accountForm'].resetFields();
        },
    },
    created(){
        this.accountForm={...this.accountForm,...this.account}
    }
}
</script>
<style>
    @import '~@/css/components/base/tab/base-dialog-group.css';
    @import '../css/video-operation.css';
</style>