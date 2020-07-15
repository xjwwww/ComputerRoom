<template>
    <div class="video-operation-well video-operation-well_funciton_preview">
        <div class="video-operation-well__row">
            <el-col :span="4">
                码流类型:&nbsp;
                <!-- <el-select v-model="recordStreamType" placeholder="请选择" size="mini" style="width:100px;">
                    <el-option key="1" :value="1" label="主码流">主码流</el-option>
                    <el-option key="2" :value="2" label="子码流">子码流</el-option>
                    <el-option key="3" :value="3" label="第三码流">第三码流</el-option>
                    <el-option key="4" :value="4" label="转码码流">转码码流</el-option>
                </el-select> -->
                <select v-model.number="iStreamType">
                    <option value="1">主码流</option>
                    <option value="2">子码流</option>
                    <option value="3">第三码流</option>
                    <option value="4">转码码流</option>
                </select>
            </el-col>
            <el-col :span="5">
                通道列表:&nbsp;
                <!-- <el-select v-model="selectedChannel" placeholder="请选择" size="mini" style="width:120px;">
                    <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name">{{item.name}}</el-option>
                </el-select> -->

                <select v-model.number="selectedChannel">
                    <option v-for="item in channels" :key="item.id" :value="item.id">{{item.name}}</option>
                </select>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" round size="mini" @click="clickStartRealPlay">开始预览</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="info" round size="mini" @click="clickStopRealPlay">停止预览</el-button>
            </el-col>

            <!-- 一键全部预览 -->
            <el-col :span="2">
                <el-button type="primary" round size="mini" @click="oneClickPreviewAll()">一键全部预览</el-button>
            </el-col>
        </div>

        <div class="video-operation-well__row">
            <el-col :span="9">
                音量:
                &emsp;&emsp;
                <el-input-number v-model="voice" :min="0" :max="100" label="描述文字" size="mini"></el-input-number>
                &nbsp;
                (范围：0-100)
            </el-col>
            <el-col :span="2">
                <el-button type="primary" round size="mini">打开声音</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="info" round size="mini">关闭声音</el-button>
            </el-col>

            <!-- 一键停止预览 -->
            <el-col :span="2">
                <el-button type="info" round size="mini" @click="oneClickStopAll()">一键停止预览</el-button>
            </el-col>
            
        </div>

        <div class="video-operation-well__row">
            <el-col :span="6" justify="space-around">
                <el-button type="info" round size="mini" @click="clickStartRecord('realplay')">开始录像</el-button>
                <el-button type="info" round size="mini" @click="clickStopRecord('realplay')">停止录像</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { WebVideoCtrl } from '../js/Hikvision/webVideoCtrl.js'
import {notifyMaker} from '../js/Hikvision/videoUtil.js'

import {mapGetters} from 'vuex'

export default {
    data(){
        return{
            iStreamType: 1,
            bZeroChannel: false,
            selectedChannel:1,
            voice:0,
            g_szRecordType:'',
            // notifyMaker:undefined,
            newChannels: undefined
        }
    },
    beforeDestroy(){

        var iTypeNum = undefined;

        if(this.iType == 2){
            iTypeNum = this.iType * this.iType // 窗口分割数旧值

        }else if(this.iType.newVal){
            iTypeNum = this.iType.newVal * this.iType.newVal // 窗口分割数新值
        }

        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex)

        for(let i = 0; i < iTypeNum; i++){

            if (oWndInfo != null) {
                // 离开页面前停止播放
                WebVideoCtrl.I_Stop({
                    iWndIndex: i,
                    success: function () {
                        console.log('停止预览成功')
                    },
                    error: function () {           
                        notifyMaker("停止预览失败！")
                    }
                })
            }
        }
        console.log('销毁之前--->停止预览成功')
    },
    props:['channels','g_iWndIndex','szDeviceIdentify','iRtspPort'],
    computed:{
        ...mapGetters(['iType'])
    },

    methods:{
        // 一键停止预览
        oneClickStopAll(){
            console.log('----iType: '+this.iType)

            let iTypeNum = undefined;

            if(this.iType == 2){
                iTypeNum = this.iType * this.iType;

            }else if(this.iType.oldVal > this.iType.newVal){
                iTypeNum = this.iType.oldVal * this.iType.oldVal

            }else if(this.iType.newVal > this.iType.oldVal){
                iTypeNum = this.iType.newVal * this.iType.newVal
            }
            
            for(let i = 0; i < iTypeNum; i++){
                WebVideoCtrl.I_Stop({
                    iWndIndex: i,
                    success: function(){
                        console.log('一键停止预览 : --> 成功')
                    },
                    error: function(){
                        console.log('一键停止预览失败')
                    }
                })
            }

        },

        // 一键全部预览
        oneClickPreviewAll(){
            console.log('---- iType :'+this.iType)

            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szDeviceIdentify = this.szDeviceIdentify,
                iRtspPort = this.iRtspPort,
                iStreamType = this.iStreamType,
                szInfo = '';
                

            if ('null' == szDeviceIdentify) {
                return
            }

            var iTypeNum = undefined, iTypeOldVal = undefined;

            if(this.iType == 2){
                iTypeNum = this.iType * this.iType
            }else{
                iTypeOldVal = this.iType.oldVal * this.iType.oldVal // 窗口分割数旧值
                iTypeNum = this.iType.newVal * this.iType.newVal // 窗口分割数新值
            }


            var startRealPlay =  (num)=> {
                console.log('num: '+num)

                let iChannelID = num + 1

                WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
                    iRtspPort: iRtspPort,
                    iWndIndex: num,
                    iStreamType: iStreamType,
                    iChannelID: iChannelID,
                    bZeroChannel: false,

                    success: function () {
                        console.log('一键预览成功')
                    },

                    error: function (status, xmlDoc) {
                        
                        if (403 === status) {
                            szInfo = "设备不支持Websocket取流！"
                        } else {
                            szInfo = "开始预览失败！"
                            
                        }
 
                        notifyMaker(szInfo)
                    }
                })
            }


            if(iTypeNum == 1){
                if(this.iType != 2){

                    for(let i = 0; i < iTypeOldVal; i++){
                        WebVideoCtrl.I_Stop({
                            iWndIndex: i
                        })
                    }
                }
                
                //let bZeroChannel = this.channels[0].bZeroChannel?true:false
                startRealPlay(0);
            }else{

                if(this.iType != 2){

                    for(let i = 0; i < iTypeOldVal; i++){
                        WebVideoCtrl.I_Stop({
                            iWndIndex: i
                        })
                    }
                }

                for(let i = 0; i < iTypeNum; i++){
                    //let bZeroChannel = this.channels[i].bZeroChannel?true:false  
                    startRealPlay(i)           
                }
            }

        },








        // 开始预览
        clickStartRealPlay() {
            //console.log(this.channels[0])

            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szDeviceIdentify = this.szDeviceIdentify,
                iRtspPort = this.iRtspPort,
                iChannelID = this.selectedChannel,
                bZeroChannel = this.channels[this.selectedChannel-1].bZeroChannel?true:false,
                szInfo = ""
            if (null == szDeviceIdentify) {
                return
            }

            var startRealPlay =  ()=> {

                WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
                    iRtspPort: iRtspPort,
                    iWndIndex: this.g_iWndIndex,
                    iStreamType: this.iStreamType,
                    iChannelID: iChannelID,
                    bZeroChannel: bZeroChannel,
                    success: function () {
                        console.log('成功')
                    },
                    error: function (status, xmlDoc) {
                        if (403 === status) {
                            szInfo = "设备不支持Websocket取流！"
                        } else {
                            szInfo = "开始预览失败！"
                        }
                        notifyMaker(szInfo)
                    }
                })
            }

            if (oWndInfo != null) {// 已经在播放了，先停止
                WebVideoCtrl.I_Stop({
                    success: function () {
                        startRealPlay()
                    }
                })
            } else {
                startRealPlay()
                //console.log('成功')
            }
        },

        // 停止预览
        clickStopRealPlay() {
            
            
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex)

            if (oWndInfo != null) {
                WebVideoCtrl.I_Stop({
                    success: function () {
                        
                    },
                    error: function () {
                        
                        notifyMaker("停止预览失败！")
                    }
                })
            }
        },

        // 开始录像
        clickStartRecord(szType) {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szInfo = ""

            this.g_szRecordType = szType

            if (oWndInfo != null) {
                var szChannelID = this.selectedChannel,
                    szFileName = oWndInfo.szDeviceIdentify + "_" + szChannelID + "_" + new Date().getTime()

                WebVideoCtrl.I_StartRecord(szFileName, {
                    bDateDir: true, //是否生成日期文件
                    success: function () {
                        if ('realplay' === szType) {
                            szInfo = "开始录像成功！"
                        } else if ('playback' === szType) {
                            szInfo = "开始剪辑成功！"
                        }
                        
                        notifyMaker(szInfo,'success')
                    },
                    error: function () {
                        if ('realplay' === szType) {
                            szInfo = "开始录像失败！"
                        } else if ('playback' === szType) {
                            szInfo = "开始剪辑失败！"
                        }
                        notifyMaker(szInfo)
                    }
                })
            }
        },

        // 停止录像
        clickStopRecord(szType, iWndIndex) {
            if ("undefined" === typeof iWndIndex) {
                iWndIndex = this.g_iWndIndex
            }
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(iWndIndex),
                szInfo = ""

            if (oWndInfo != null) {
                WebVideoCtrl.I_StopRecord({
                    success: function () {
                        if ('realplay' === szType) {
                            szInfo = "停止录像成功！"
                        } else if ('playback' === szType) {
                            szInfo = "停止剪辑成功！"
                        }
                        notifyMaker(szInfo,'success')
                    },
                    error: function () {
                        if ('realplay' === szType) {
                            szInfo = "停止录像失败！"
                        } else if ('playback' === szType) {
                            szInfo = "停止剪辑失败！"
                        }
                        notifyMaker(szInfo)
                    }
                })
            }
        },

        // 打开声音
        openVoice(){
            WebVideoCtrl
        },

        // 关闭声音
        closeVoice(){
            WebVideoCtrl
        }
    }
}
</script>
<style>
    @import '../css/video-operation.css';
</style>