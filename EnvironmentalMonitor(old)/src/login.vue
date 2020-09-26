<template>
    <div class="ctm-body login-body">
        <!-- <div class="login-logo">
            <img src="./img/login/logo.svg" alt="">
        </div> -->
        <div class="login-container">
            <div class="login-container__content">
                <img src="./img/login/view/embellish.png" class="login-embellish">
            </div>
            <div class="login-container__content">
                <div class="sigin-container">
                    <div>
                        <h3 style="color:rgb(79, 168, 245);margin-top:10px;">综合机柜人机交互系统</h3>
                        <p style="color: gray">使机房管理变得更便捷、更智能！</p>
                    </div>

                    <!-- <form :action="fromPath" class="signin-form" @submit="checkLogin"> -->
                    <form action="" class="signin-form" @submit.prevent="checkLogin">
                        <div>
                            <input type="text" class="signin-form__input signin-form__input_context_account" v-model="account" id="account" name="account" placeholder="账号" required autocomplete="off">
                        </div>
                        <div>
                            <input type="password" class="signin-form__input signin-form__input_context_password" v-model="password" id="password" name="password" placeholder="密码" required>
                        </div>
                        <div class="signin-form__checkbox" style="color: gray">
                            <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
                        </div>
                        <div>
                            <button class="signin-form__signin">立即登录</button>
                        </div>
                    </form>
                    <div class="declare">
                        版权所有，侵权必究
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="company-name">
            广州莱安智能化系统开发有限公司
            <br>
            http://lain.com.cn/cn/
        </div> -->
    </div>
</template>
<script>
import query from './js/query/login/loginQuery.js'
import {encodeName} from './js/util/util.js'

export default {
    data(){
        return {
            account:'',
            password:'',
            fromPath:'/',
            rememberMe:'',
            query:query
        }
    },

    methods:{
        checkLogin(){
            this.query.login(this.account,this.password)
            .then(result=>{
                if(result.zt==='ok'){
                    let name=encodeName(this.account)
                    sessionStorage.setItem('token',name)
                     sessionStorage.setItem('NewToken',result.token)
                    window.location.href=this.fromPath
                    return
                }
                this.$message.error('账号不存在或密码错误')
            })
            // if(this.account=='admin'&&this.password=='admin'){
            //     sessionStorage.setItem('token','111');
            //     return true;
            // }
            // return false;
        },
        getQueryVariable(variable){
            var query=window.location.search.substring(1);
            var vars=query.split("&");
            for(var i=0;i<vars.length;i++){
                var pair=vars[i].split("=");
                if(pair[0]==variable)
                    return pair[1];
            }
            return (false);
        }
    },
    created(){
        document.onreadystatechange=function(){
            if(document.readyState=="complete"){
                let loading=document.getElementById('loading');
                document.body.removeChild(loading);
            }
        };
        var _fromPath=this.getQueryVariable('fromPath');
        if(_fromPath)
            this.fromPath="/#"+_fromPath;
    }
}
</script>
<style>
    @import './css/page.css';
    @import './css/login/login.css';
</style>
