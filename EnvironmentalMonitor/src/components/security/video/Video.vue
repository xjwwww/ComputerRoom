<template>
    <div class="video-container">
        <div class="video-container__first-row">
            <div class="video-window">
                <div class="video-window__head">
                    <div class="video-window__title">视频窗口</div>
                    
                    <div class="video-window__devide-numbers">
                        窗口分割数:
                        <el-select v-model="windowNumber" placeholder="请选择" size="mini" style="width:90px;">
                            <el-option key="1" :value="1" label="1×1">1×1</el-option>
                            <el-option key="2" :value="2" label="2×2">2×2</el-option>
                            <el-option key="3" :value="3" label="3×3">3×3</el-option>
                            <el-option key="4" :value="4" label="4×4">4×4</el-option>
                        </el-select>
                    </div>
                </div>
                    








             
                <div id="divPlugin" class="plugin">
                                    
                </div>











            </div>
            <div class="cloud-controller">
                <div class="cloud-controller__head">
                    云台控制
                </div>
            </div>
        </div>
        <div class="video-container__second-row">
            <el-tabs v-model="activeName" :stretch="true">
                <el-tab-pane label="预览" name="preview">
                    <video-preview :channels="channels" :g_iWndIndex="g_iWndIndex" :szDeviceIdentify="szDeviceIdentify" :iRtspPort="iRtspPort"></video-preview>
                </el-tab-pane>
                <el-tab-pane label="回放" name="playback" lazy>
                    <video-playback :channels="channels" :g_iWndIndex="g_iWndIndex" :szDeviceIdentify="szDeviceIdentify" :iRtspPort="iRtspPort"></video-playback>
                </el-tab-pane>
                <!-- <el-tab-pane label="绘图" name="draw" lazy>绘图</el-tab-pane> -->
                <el-tab-pane label="本地设置" name="set" lazy>
                    <video-setting></video-setting>
                </el-tab-pane>
                <!-- <el-tab-pane label="系统维护" name="system" lazy>系统维护</el-tab-pane> -->
                <el-tab-pane label="账号管理" name="account" lazy v-if="hasPermission">
                    <video-account :account="account" @transferRefresh="refresh"></video-account>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { WebVideoCtrl } from './js/Hikvision/webVideoCtrl.js'
import {notifyMaker} from './js/Hikvision/videoUtil.js'
import query from './js/videoQuery.js'
import VideoPreview from './tab/VideoPreview.vue'
import VideoPlayBack from './tab/VideoPlayBack.vue'
import VideoSetting from './tab/VideoSetting.vue'
import VideoAccount from './tab/VideoAccount.vue'


export default {
    data(){
        return{
            account:undefined,
            iDevicePort:undefined,
            iRtspPort:0,
            activeName:'preview',
            channels:[],
            windowNumber:2,
            g_iWndIndex: 0,//当前选中的窗口

            g_bPTZAuto: false,//云台控制
            iWidth: 680,
            iHeight: 380
        }
    },
    watch:{
        // 监听窗口分割数
        windowNumber(newVal, oldVal){
            console.log('windowNumber新值: '+newVal+', windowNumber旧值: '+oldVal)
            this.changeWndNum(newVal)

            this.$store.commit('system/UPDATE_ITYPE', {newVal: newVal, oldVal: oldVal})
        }
    },

    mounted () {

        query.getAccount()
        .then(data=>{
            this.account=data
            //console.log('account:   '+this.account)
        })
        .then(()=>{
            
            this.videoInitPlugin()
            this.login()
        })
        
    },

    beforeDestroy() {
        this.logout()
    },
    computed:{
        szDeviceIdentify(){
            if(this.account)
                return this.account.szIP + "_" + this.account.szPort
            return null
        }
    },
    components:{
        'video-preview':VideoPreview,
        'video-playback':VideoPlayBack,
        'video-setting':VideoSetting,
        'video-account':VideoAccount
    },
    methods:{
        // 刷新
        refresh(){
            this.logout()
            this.login()
        },

        // 窗口分割数
        changeWndNum(iType) {
            WebVideoCtrl.I_ChangeWndNum(iType);
        },
        // 登录
        login() {
            //console.log(this.account)
            var iRet = WebVideoCtrl.I_Login(this.account.szIP, 1, this.account.szPort, this.account.szUsername, this.account.szPassword, {
                async:false,
                success: (xmlDoc)=> {
                    console.log('登录成功')
                    //console.log(xmlDoc)
                    setTimeout( ()=> {
                        this.getChannelInfo()
                        this.getDevicePort()
                    }, 10)
                },
                error:(status, xmlDoc)=> {
                    //console.log(status, xmlDoc)
                    notifyMaker("登录失败！")
                }
            })
            //console.log(iRet)

            if (-1 == iRet) {
                notifyMaker("已登录过！")
            }
        },

        // 退出
        logout() {
            let szInfo = ""
            if (null == this.szDeviceIdentify) {
                return
            }

            var iRet = WebVideoCtrl.I_Logout(this.szDeviceIdentify);
            if (0 == iRet) {
                
            } else {
                notifyMaker("退出失败！")
            }
            
        },
        
        // 获取设备端口与RTSP端口
        getDevicePort() {
            if (null == this.szDeviceIdentify) {
                return
            }
            let oPort = WebVideoCtrl.I_GetDevicePort(this.szDeviceIdentify);
            //console.log(oPort)
            if(oPort!==null){
                this.iDevicePort=oPort.iDevicePort
                this.iRtspPort = oPort.iRtspPort
            }else{
                notifyMaker('获取端口失败！')
            }
        },

        // 获取通道
        getChannelInfo() {

            if (null === this.szDeviceIdentify) {
                return
            }

            // 模拟通道 this.szDeviceIdentify
            WebVideoCtrl.I_GetAnalogChannelInfo(this.account.szIP + "_" + this.account.szPort, {
                async: false,
                success:  (xmlDoc)=> {
                    //console.log(xmlDoc)
                },
                error: (status, xmlDoc)=> {
                    //console.log(status, xmlDoc)
                    //notifyMaker(" 获取模拟通道失败！")
                }
            })
            // 数字通道
            WebVideoCtrl.I_GetDigitalChannelInfo(this.szDeviceIdentify, {
                async: false,
                success:  (digitalChannels)=> {
                    digitalChannels.splice(21,1)
                    //console.log(digitalChannels)
                    this.channels.push(...digitalChannels)
                },
                error:  (status, xmlDoc) =>{
                    notifyMaker(" 获取数字通道失败！")
                }
            })
            // 零通道
            WebVideoCtrl.I_GetZeroChannelInfo(this.szDeviceIdentify, {
                async: false,
                success:  (xmlDoc)=> {
                },
                error:  (status) =>{
                    notifyMaker(" 获取零通道失败！")
                }
            })
        },

        videoInitPlugin() {
            var iRet = WebVideoCtrl.I_CheckPluginInstall()
            //console.log(iRet)

            // 检查插件是否已安装（包含 Chrome 版本检查）
            if (iRet === -1) {
                alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！")
                return
            }
            this.initPlugin()
        },

        // 初始化视频插件
        initPlugin(){

            // 初始化插件的各种属性
            WebVideoCtrl.I_InitPlugin(this.iWidth, this.iHeight, {
                bWndFull: true,//是否支持单窗口双击全屏，默I_CheckPluginInstall
                iWndowType: 2, //分屏类型：1- 1*1，2- 2*2，3- 3*3，4- 4*4，默认值为 1，单画面
                // 打印选择的窗口
                cbSelWnd: (xmlDoc)=> {
                    //console.log('xmlDoc'+xmlDoc)
                    this.g_iWndIndex = parseInt($(xmlDoc).find("SelectWnd").eq(0).text(), 10)
                },
                // 初始化窗口以及检查版本
                cbInitPluginComplete: () =>{

                    //console.log(this.$refs)

                    // 在 HTML DOM 元素中插入播放插件
                    WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin")
                    if (WebVideoCtrl.I_CheckPluginVersion() === -1) {
                        alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！")
                        return
                    }
                }
            }) 
        },
    },
}
</script>
<style>
    @import './css/video.css';
</style>