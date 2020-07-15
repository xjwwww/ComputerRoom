<template>
    <div class="video-operation-well video-operation-well_funciton_preview">
        <div class="video-operation-well__row">
            <el-col :span="3">播放性能</el-col>
            <el-col :span="3">
                <select ref="netsPreach" name="netsPreach" class="sel">
                    <option value="0">最短延时</option>
                    <option value="1">实时性好</option>
                    <option value="2">均衡</option>
                    <option value="3">流畅性好</option>
                </select>
            </el-col>
            <el-col :span="3">图像尺寸</el-col>
            <el-col :span="3">
                <select ref="wndSize" name="wndSize" class="sel">
                    <option value="0">充满</option>
                    <option value="1">4:3</option>
                    <option value="2">16:9</option>
                </select>
            </el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="3">规则信息</el-col>
            <el-col :span="3">
                <select ref="rulesInfo" name="rulesInfo" class="sel">
                    <option value="1">启用</option>
                    <option value="0">禁用</option>
                </select>
            </el-col>
            <el-col :span="3">抓图文件格式</el-col>
            <el-col :span="3">
                <select ref="captureFileFormat" name="captureFileFormat" class="sel">
                    <option value="0">JPEG</option>
                    <option value="1">BMP</option>
                </select>
            </el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="3">录像文件打包大小</el-col>
            <el-col :span="3">
                <select ref="packSize" name="packSize" class="sel">
                    <option value="0">256M</option>
                    <option value="1">512M</option>
                    <option value="2">1G</option>
                </select>
            </el-col>
            <el-col :span="3">协议类型</el-col>
            <el-col :span="3">
                <select ref="protocolType" name="protocolType" class="sel">
                    <option value="0">TCP</option>
                    <option value="2">UDP</option>
                </select>
            </el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="3">录像文件保存路径</el-col>
            <el-col :span="12"><input ref="recordPath" type="text" class="txt" />&nbsp;<input type="button" class="btn" value="浏览" @click="()=>clickOpenFileDlg('recordPath', 0)" /></el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="3">回放下载保存路径</el-col>
            <el-col :span="12"><input ref="downloadPath" type="text" class="txt" />&nbsp;<input type="button" class="btn" value="浏览" @click="()=>clickOpenFileDlg('downloadPath', 0)" /></el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="3">预览抓图保存路径</el-col>
            <el-col :span="12"><input ref="previewPicPath" type="text" class="txt" />&nbsp;<input type="button" class="btn" value="浏览" @click="()=>clickOpenFileDlg('previewPicPath', 0)" /></el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="3">回放抓图保存路径</el-col>
            <el-col :span="12"><input ref="playbackPicPath" type="text" class="txt" />&nbsp;<input type="button" class="btn" value="浏览" @click="()=>clickOpenFileDlg('playbackPicPath', 0)" /></el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="3">回放剪辑保存路径</el-col>
            <el-col :span="12"><input ref="playbackFilePath" type="text" class="txt" />&nbsp;<input type="button" class="btn" value="浏览" @click="()=>clickOpenFileDlg('playbackFilePath', 0)" /></el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="3">设备抓图保存路径</el-col>
            <el-col :span="12"><input ref="devicePicPath" type="text" class="txt" />&nbsp;<input type="button" class="btn" value="浏览" @click="()=>clickOpenFileDlg('devicePicPath', 0)" /></el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="2">
                <el-button type="primary" round size="mini" @click="clickGetLocalCfg">刷新设置</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="info" round size="mini" @click="clickSetLocalCfg">保存设置</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { WebVideoCtrl } from '../js/Hikvision/webVideoCtrl.js'
import {notifyMaker} from '../js/Hikvision/videoUtil.js'

export default {
    methods:{
        // 打开选择框 0：文件夹  1：文件
        clickOpenFileDlg(id, iType) {
            var szDirPath = WebVideoCtrl.I_OpenFileDlg(iType)
            
            if (szDirPath != -1 && szDirPath != "" && szDirPath != null) {
                this.$refs[id].value=szDirPath
            }
        },
        // 获取本地参数
        clickGetLocalCfg() {
            var xmlDoc = WebVideoCtrl.I_GetLocalCfg()
            // console.log(xmlDoc)
            if (xmlDoc != null) {
                this.$refs['netsPreach'].value=($(xmlDoc).find("PlayWndType").eq(0).text())
                this.$refs["wndSize"].value=($(xmlDoc).find("PlayWndType").eq(0).text())
                this.$refs["rulesInfo"].value=($(xmlDoc).find("IVSMode").eq(0).text())
                this.$refs["captureFileFormat"].value=($(xmlDoc).find("CaptureFileFormat").eq(0).text())
                this.$refs["packSize"].value=($(xmlDoc).find("PackgeSize").eq(0).text())
                this.$refs["recordPath"].value=($(xmlDoc).find("RecordPath").eq(0).text())
                this.$refs["downloadPath"].value=($(xmlDoc).find("DownloadPath").eq(0).text())
                this.$refs["previewPicPath"].value=($(xmlDoc).find("CapturePath").eq(0).text())
                this.$refs["playbackPicPath"].value=($(xmlDoc).find("PlaybackPicPath").eq(0).text())
                this.$refs["devicePicPath"].value=($(xmlDoc).find("DeviceCapturePath").eq(0).text())
                this.$refs["playbackFilePath"].value=($(xmlDoc).find("PlaybackFilePath").eq(0).text())
                this.$refs["protocolType"].value=($(xmlDoc).find("ProtocolType").eq(0).text())
            } else 
                notifyMaker("本地配置获取失败！")
        },

        // 设置本地参数
        clickSetLocalCfg() {
            var arrXml = []
            
            arrXml.push("<LocalConfigInfo>")
            arrXml.push("<PackgeSize>" + this.$refs["packSize"].value + "</PackgeSize>")
            arrXml.push("<PlayWndType>" + this.$refs["wndSize"].value + "</PlayWndType>")
            arrXml.push("<BuffNumberType>" + this.$refs["netsPreach"].value + "</BuffNumberType>")
            arrXml.push("<RecordPath>" + this.$refs["recordPath"].value + "</RecordPath>")
            arrXml.push("<CapturePath>" + this.$refs["previewPicPath"].value + "</CapturePath>")
            arrXml.push("<PlaybackFilePath>" + this.$refs["playbackFilePath"].value + "</PlaybackFilePath>")
            arrXml.push("<PlaybackPicPath>" + this.$refs["playbackPicPath"].value + "</PlaybackPicPath>")
            arrXml.push("<DeviceCapturePath>" + this.$refs["devicePicPath"].value + "</DeviceCapturePath>")
            arrXml.push("<DownloadPath>" + this.$refs["downloadPath"].value + "</DownloadPath>")
            arrXml.push("<IVSMode>" + this.$refs["rulesInfo"].value + "</IVSMode>")
            arrXml.push("<CaptureFileFormat>" + this.$refs["captureFileFormat"].value + "</CaptureFileFormat>")
            arrXml.push("<ProtocolType>" + this.$refs["protocolType"].value + "</ProtocolType>")
            arrXml.push("</LocalConfigInfo>")

            var iRet = WebVideoCtrl.I_SetLocalCfg(arrXml.join(""))
            if (0 == iRet) {
                notifyMaker("本地配置设置成功！",'success')
            } else 
                notifyMaker( "本地配置设置失败！")
        },
    },
    mounted(){
        this.clickGetLocalCfg()
    }
}
</script>
<style>
    @import '../css/video-operation.css';
</style>