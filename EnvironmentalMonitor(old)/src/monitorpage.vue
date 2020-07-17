<template>  
    <div class="ctm-body">
        <!-- <div class="ctm-header">
            <nav class="ctm-navibar" role="navigation"> 
                <div class="ctm-navibar__header">
                    <div class="software-name">
                        <div class="en-name" v-if="selectedSystem">KITOZER<span class="en-name-suffix">&reg;</span></div>
                        <div class="ch-name">{{selectedSystem?selectedSystem.name:'请选择系统'}}</div>
                    </div>
                </div>
                <div class="ctm-navibar__middle">

                    <el-popover v-model="item.popVisible" :ref="item.key" placement="bottom" trigger="hover" v-for="item in monitoringItem" :key="item.key" popper-class="monitor-item-pop" width="160">
                        <div class="monitor-item-pop__list">
                            <router-link :to="device.urlAddress" @click.native="item.popVisible=false" v-for="device in item.devices" :key="device.key" v-slot="{isActive,href,navigate}" tag="div">
                                <device-item  :isActive="isActive" :device="device" :href="href" :navigate="navigate"></device-item>
                            </router-link>
                        </div>
                    </el-popover>
                    
                    <div class="ctm-navibar-item ctm-navibar-item_middle">
                        <router-link to="/homepage" tag="a" class="ctm-navibar-item__href ctm-navibar-item__href_middle" active-class="ctm-navibar-item__href_active">
                           主页
                        </router-link>
                    </div>
                    <router-link :to="item.urlAddress" class="ctm-navibar-item ctm-navibar-item_middle" v-slot="{isActive}"  v-for="item in monitoringItem" :key="item.name" v-popover="item.key">
                        <a class="ctm-navibar-item__href ctm-navibar-item__href_middle" :class="isActive && 'ctm-navibar-item__href_active'">
                            {{item.name}}
                        </a>
                    </router-link>
                </div>

                <div class="ctm-navibar__right">
                    <div class="ctm-navibar-item ctm-navibar-item_right">
                        <a class="ctm-navibar-item__href ctm-navibar-item__href_right" href="#"  title="软件帮助文档">
                            <i class="el-icon-chat-dot-round"></i>
                        </a>
                    </div>

                    <div class="ctm-navibar-item ctm-navibar-item_right">
                        <router-link to="/systems"  title="选择系统" tag="a" class="ctm-navibar-item__href ctm-navibar-item__href_right">
                            <i class="el-icon-setting"></i>
                        </router-link>
                    </div>

                    <div class="ctm-navibar-item ctm-navibar-item_right">
                        <router-link to="/alarm"  title="告警信息查询" tag="a" class="ctm-navibar-item__href ctm-navibar-item__href_right">       
                            <el-badge :value="unReadAlarmNumber" class="item" :max="99">
                                <i class="el-icon-bell"></i>
                            </el-badge>
                        </router-link>
                    </div>

                    <div class="ctm-navibar-item ctm-navibar-item_right">
                        <a class="ctm-navibar-item__href ctm-navibar-item__href_right" href="#" @click.stop="updateAccountDialogVisible=true"  title="个人信息">       
                            <i class="el-icon-user"></i>
                        </a>
                    </div>

                    <div class="ctm-navibar-item ctm-navibar-item_right">
                        <a class="ctm-navibar-item__href ctm-navibar-item__href_right" href="#" @click.stop="logout"  title="退出登录">       
                            <i class="el-icon-switch-button"></i>
                        </a>
                    </div>
                </div>             
            </nav> 
        </div> -->
        <monitor-header/>
        <router-view></router-view>
        
        <!-- <el-dialog title="查看个人信息" :visible.sync="updateAccountDialogVisible" width="520px" center custom-class="ctm-dialog">              
            <el-form :model="personInfo" label-width="80px" size="small">
                <el-form-item label="用户名">
                    <el-input v-model="personInfo.username" type="text"></el-input>
                </el-form-item>
                <el-form-item label="旧密码">
                    <el-input ref="oldPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input ref="newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input ref="confirmPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="personInfo.telephone" type="tel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="personInfo.email" type="email"></el-input>
                </el-form-item>
                <el-form-item label="角色类型">
                    <el-radio-group v-model="personInfo.role">
                        <el-radio :label="2">用户</el-radio>
                        <el-radio :label="1">管理员</el-radio>
                        <el-radio :label="0">超级管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="工作日">
                    <el-checkbox-group v-model="personInfo.workday" size="mini">
                        <el-checkbox-button label="周一" :key="1"></el-checkbox-button>
                        <el-checkbox-button label="周二" :key="2"></el-checkbox-button>
                        <el-checkbox-button label="周三" :key="3"></el-checkbox-button>
                        <el-checkbox-button label="周四" :key="4"></el-checkbox-button>
                        <el-checkbox-button label="周五" :key="5"></el-checkbox-button>
                        <el-checkbox-button label="周六" :key="6"></el-checkbox-button>
                        <el-checkbox-button label="周日" :key="7"></el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <div style="width:50%;">
                    <button @click="updateAccountDialogVisible = false" class="create">确 定</button>
                </div>
                <div style="width:50%;">
                    <button @click="updateAccountDialogVisible = false" class="cancel">取 消</button>
                </div>                    
            </span>
        </el-dialog> -->
    </div>
  
</template>
<script>
    // import DeviceItem from './components/monitorpage/DeviceItem.vue'
    // import register from './components/register.js'
    // import {mapGetters} from 'vuex'
    import MonitorHeader from '@/components/header/MonitorHeader.vue'

    export default {
        // data(){
        //     return{
        //         visible: false,
        //         updateAccountDialogVisible:false,
        //         personInfo:{
        //             username:'admin',
        //             password:'admin',
        //             telephone:'13875728883',
        //             email:'183992373@qq.com',
        //             role:0,
        //             workday:['周一','周二']
        //         },
        //     }
            
        // },
        // methods: {
        //     // selectMonitoringPlace(name){
        //     //     this.monitoredPlace=name;
        //     // },
        //     logout(){
        //         sessionStorage.removeItem('token');
        //         window.location.href="/login.html"; 
        //     },
        //     initRoute(items){
        //         let dynamicRoutes=[]
        //         items.forEach(({key,visible,devices})=>{
        //             if(!visible)
        //                 return
        //             devices.forEach(device=>{
        //                 if(!device.visible)
        //                     return
        //                 let newRoute={
        //                     path:`/${key}/${device.key}`,
        //                     meta:{ requireAuth:true},
        //                     component:register[device.key]
        //                 }
        //                 dynamicRoutes.push(newRoute)
        //             })
        //         })
        //         this.$router.addRoutes([...dynamicRoutes])
        //     },
        //     checkSystemCookie(){
        //         let cookies=document.cookie.split(';')
        //         let keyName="selectedSystem"
        //         for(let i=cookies.length-1;i>=0;i--){
        //             cookies[i]=cookies[i].trim()
        //             if(cookies[i].indexOf(keyName)==0){
        //                 return JSON.parse(cookies[i].substring(keyName.length+1,cookies[i].length))
        //             }
        //         }
        //         return null
        //     },
        //     // ...mapActions(['queryReadAlarm','queryMenu','querySystems']),
        //     // ...mapMutations(['UPDATE_SELECTEDSYSTEM'])
        // },
        // created() {
        //     let loading=document.getElementById('loading')
        //     if(loading!=null)
        //         document.body.removeChild(loading)
        //     this.$store.dispatch('alarm/updateAlarm')

        //     // this.querySystems()
        //     this.$store.dispatch('system/updateSystems')
        //     .then(()=>{
        //         if(!this.selectedSystem){
        //             let system=this.checkSystemCookie()
        //             if(!system){
        //                 this.$router.push({name:'systems'})
        //                 return Promise.reject()
        //             }else
        //                 this.$store.commit('system/UPDATE_SELECTEDSYSTEM',system)
        //                 // this.UPDATE_SELECTEDSYSTEM(system)
        //         }
        //     })
        //     .then(()=>this.$store.dispatch('system/updateMenu'))
        //     // this.queryMenu()
        // },
        // computed:{
        //     ...mapGetters(["menu","unReadAlarmNumber","selectedSystem"]),
        //     monitoringItem(){
        //         this.initRoute(this.menu)
        //         let items=[]
        //         this.menu.forEach(({name,key,visible,devices})=>{
        //             if(!visible)
        //                 return
        //             let newItem={
        //                 name,
        //                 key,
        //                 urlAddress:`/${key}`,
        //                 devices:[]
        //             }
        //             devices.forEach(device=>{
        //                 if(!device.visible)
        //                     return
        //                 let newDevice={
        //                     name:device.name,
        //                     key:device.key,
        //                     urlAddress:`/${key}/${device.key}`
        //                 }
        //                 newItem.devices.push(newDevice)
        //             })
        //             items.push(newItem)
        //         })
        //         return items
        //     }
        // },
        components:{
            'monitor-header':MonitorHeader
        }
    }
</script>
<style>
    @import './css/page.css';
    /* @import './css/monitorpage/page-navigator.css';
    @import '~@/css/components/base/tab/base-dialog-group.css'; */
</style>
