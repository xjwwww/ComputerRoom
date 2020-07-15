<template>
    <div class="video-operation-well video-operation-well_funciton_playback">
        <div class="video-operation-well__row">
            <el-col :span="4">
                码流类型:&nbsp;
                <select v-model.number="recordStreamType">
                    <option value="1">主码流</option>
                    <option value="2">子码流</option>
                </select>
            </el-col>
            <el-col :span="5">
                通道列表:&nbsp;
                <select v-model.number="selectedChannel">
                    <option v-for="item in channels" :key="item.id" :value="item.id">{{item.name}}</option>
                </select>
            </el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="18">
                开始时间:
                &nbsp;
                <el-input v-model="szStartTime" placeholder="请输入内容" size="mini" style="width:150px;"></el-input>
                &nbsp;
                （时间格式：2013-11-11 12:34:56）
            </el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="18">
                结束时间:
                &nbsp;
                <el-input v-model="szEndTime" placeholder="请输入内容" size="mini" style="width:150px;"></el-input>
                &nbsp;
                <el-button size="mini" @click="clickRecordSearch(0)">搜索</el-button>
            </el-col>
        </div>
        <div class="video-operation-well__row">
            <el-col :span="16" justify="space-around">
                <el-button type="info" round size="mini" @click="clickStartPlayback">开始回放</el-button>
                <el-button type="info" round size="mini" @click="clickStopPlayback">停止回放</el-button>
                <el-button type="info" round size="mini" @click="clickPause">暂停</el-button>
                <el-button type="info" round size="mini" @click="clickResume">恢复</el-button>
                <el-button type="info" round size="mini" @click="clickPlaySlow">慢放</el-button>
                <el-button type="info" round size="mini" @click="clickPlayFast">快放</el-button>
                <el-button type="info" round size="mini" @click="clickStartRecord('playback')">开始剪辑</el-button>
                <el-button type="info" round size="mini" @click="clickStopRecord('playback')">停止剪辑</el-button>
            </el-col>
        </div>
        <div class="video-operation-well__row">
            <el-table :data="searchResult" border style="width: 100%" size="mini">
                <el-table-column prop="order" label="序号" min-width="50" align="center" head-align="center"></el-table-column>
                <el-table-column prop="filename" label="文件名" min-width="200" align="center" head-align="center"></el-table-column>
                <el-table-column prop="startTime" label="开始时间" min-width="160" align="center" head-align="center"></el-table-column>
                <el-table-column prop="endTime" label="结束时间" min-width="160" align="center" head-align="center"></el-table-column>
                <el-table-column prop="size" label="大小" min-width="120" align="center" head-align="center"></el-table-column>
                <el-table-column label="下载" min-width="80" align="center" head-align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="clickStartDownloadRecord(scope.row)">下载</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="downloadProcess" label="下载进度" min-width="80" align="center" head-align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { WebVideoCtrl } from '../js/Hikvision/webVideoCtrl.js'
import {notifyMaker} from '../js/Hikvision/videoUtil.js'

export default {
    data(){
        return{
            recordStreamType:1,
            selectedChannel:'',
            szStartTime:'',
            szEndTime:'',
            g_iSearchTimes:0,
            g_iDownloadID : -1,
            g_tDownloadProcess : 0,
            g_szRecordType:'',
            searchResult:[],
        }
    },
    props:['channels','g_iWndIndex','szDeviceIdentify','iRtspPort'],
    methods:{
        // 开始回放
        clickStartPlayback() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szDeviceIdentify = this.szDeviceIdentify,
                iRtspPort = this.iRtspPort,
                iStreamType = this.recordStreamType,
                bZeroChannel = this.channels[this.selectedChannel-1].bZero?true:false,
                iChannelID = this.selectedChannel,
                szStartTime = this.szStartTime,
                szEndTime = this.szEndTime,
                szInfo = "",
                bChecked = this.bChecked,
                iRet = -1

            if (null == szDeviceIdentify) 
                return
            
            if (bZeroChannel) // 零通道不支持回放
                return           

            var startPlayback =  ()=> {
                if (bChecked) {// 启用转码回放
                    var oTransCodeParam = {
                        TransFrameRate: "14",// 0：全帧率，5：1，6：2，7：4，8：6，9：8，10：10，11：12，12：16，14：15，15：18，13：20，16：22
                        TransResolution: "1",// 255：Auto，3：4CIF，2：QCIF，1：CIF
                        TransBitrate: "19"// 2：32K，3：48K，4：64K，5：80K，6：96K，7：128K，8：160K，9：192K，10：224K，11：256K，12：320K，13：384K，14：448K，15：512K，16：640K，17：768K，18：896K，19：1024K，20：1280K，21：1536K，22：1792K，23：2048K，24：3072K，25：4096K，26：8192K
                    }
                    WebVideoCtrl.I_StartPlayback(szDeviceIdentify, {
                        iRtspPort: iRtspPort,
                        iStreamType: iStreamType,
                        iChannelID: iChannelID,
                        szStartTime: szStartTime,
                        szEndTime: szEndTime,
                        oTransCodeParam: oTransCodeParam,
                        success: () =>{
                            
                        },
                        error: (status, xmlDoc)=> {
                            if (403 === status) {
                                szInfo = "设备不支持Websocket取流！"
                            } else {
                                szInfo = "开始回放失败！"
                            }
                            notifyMaker(szInfo)
                        }
                    })
                } else {
                    WebVideoCtrl.I_StartPlayback(szDeviceIdentify, {
                        iRtspPort: iRtspPort,
                        iStreamType: iStreamType,
                        iChannelID: iChannelID,
                        szStartTime: szStartTime,
                        szEndTime: szEndTime,
                        success:  ()=> {
                            
                        },
                        error:  (status, xmlDoc) =>{
                            if (403 === status) 
                                szInfo = "设备不支持Websocket取流！"
                             else 
                                szInfo = "开始回放失败！"
                            notifyMaker(szInfo)
                        }
                    })
                }
            }

            if (oWndInfo != null) {// 已经在播放了，先停止
                WebVideoCtrl.I_Stop({
                    success: function () {
                        startPlayback()
                    }
                })
            } else {
                startPlayback()
            }
        },

        // 停止回放
        clickStopPlayback() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szInfo = ""

            if (oWndInfo != null) {
                WebVideoCtrl.I_Stop({
                    success: function () {
                        
                    },
                    error: function () {
                        notifyMaker(szInfo)
                    }
                })
            }
        },

        // 暂停
        clickPause() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_Pause({
                    success: function () {
                        // szInfo = "暂停成功！";
                        // console.log(oWndInfo.szDeviceIdentify + " " + szInfo);
                    },
                    error: function () {
                        // szInfo = "暂停失败！";
                        // console.log(oWndInfo.szDeviceIdentify + " " + szInfo);
                        notifyMaker("暂停失败！")
                    }
                });
            }
        },

        // 恢复
        clickResume() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_Resume({
                    success: function () {
                        // szInfo = "恢复成功！";
                        // console.log(oWndInfo.szDeviceIdentify + " " + szInfo);
                    },
                    error: function () {
                        // szInfo = "恢复失败！";
                        // console.log(oWndInfo.szDeviceIdentify + " " + szInfo);
                        notifyMaker("恢复失败！")
                    }
                });
            }
        },

        // 慢放
        clickPlaySlow() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_PlaySlow({
                    success: function () {
                        // szInfo = "慢放成功！";
                        // console.log(oWndInfo.szDeviceIdentify + " " + szInfo);
                    },
                    error: function () {
                        // szInfo = "慢放失败！";
                        // console.log(oWndInfo.szDeviceIdentify + " " + szInfo);
                        notifyMaker("慢放失败！")
                    }
                });
            }
        },

        // 快放
        clickPlayFast() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szInfo = "";

            if (oWndInfo != null) {
                WebVideoCtrl.I_PlayFast({
                    success: function () {
                        // szInfo = "快放成功！";
                        // console.log(oWndInfo.szDeviceIdentify + " " + szInfo);
                    },
                    error: function () {
                        // szInfo = "快放失败！";
                        // console.log(oWndInfo.szDeviceIdentify + " " + szInfo);
                        notifyMaker("快放失败！")
                    }
                });
            }
        },

        //搜索回放记录
        clickRecordSearch(iType) {
            var szDeviceIdentify = this.szDeviceIdentify,
                iChannelID = this.selectedChannel,
                bZeroChannel = this.channels[this.selectedChannel-1].bZero?true:false,
                iStreamType = this.recordStreamType,
                szStartTime = this.szStartTime,
                szEndTime = this.szEndTime

            if (null == szDeviceIdentify) {
                return
            }

            if (bZeroChannel) {// 零通道不支持录像搜索
                return
            }

            if (0 == iType) {// 首次搜索
                this.searchResult.splice(0,this.searchResult.length)
                this.g_iSearchTimes = 0
            }

            WebVideoCtrl.I_RecordSearch(szDeviceIdentify, iChannelID, szStartTime, szEndTime, {
                iStreamType: iStreamType,
                iSearchPos: this.g_iSearchTimes * 40,
                success:  (xmlDoc)=> {
                    if ("MORE" === xmlDoc.responseStatusStrg) {
                        for(var i = 0, nLen = xmlDoc.matchList.searchMatchItem.length; i < nLen; i++) {
                            var tempSearchMatchItem=xmlDoc.matchList.searchMatchItem[i]
                            var szPlaybackURI = tempSearchMatchItem.playbackURI
                            if(szPlaybackURI.indexOf("name=") < 0) 
                                break
                            
                            var szStartTime = tempSearchMatchItem.startTime
                            var szEndTime = tempSearchMatchItem.endTime
                            var szFileName = szPlaybackURI.substring(szPlaybackURI.indexOf("name=") + 5, szPlaybackURI.indexOf("&amp;size="))
                            var size=szPlaybackURI.substring(szPlaybackURI.indexOf("size=")+5)
                            // console.log("szPlaybackURI:"+szPlaybackURI)

                            var result={}
                            result.id="downloadTd" + i
                            result.order=this.g_iSearchTimes * 40 + (i + 1)
                            result.filename=szFileName
                            result.startTime=(szStartTime.replace("T", " ")).replace("Z", "")
                            result.endTime=(szEndTime.replace("T", " ")).replace("Z", "")
                            result.playbackURI=szPlaybackURI
                            result.size=(size/1000).toFixed(0)+'kB'
                            result.downloadProcess='-'
                            this.searchResult.push(result)
                        }
                        this.g_iSearchTimes++
                        this.clickRecordSearch(1)// 继续搜索
                    } else if ("OK" === xmlDoc.responseStatusStrg) {
                        var iLength = xmlDoc.matchList.searchMatchItem.length
                        for(var i = 0; i < iLength; i++) {
                            var tempSearchMatchItem=xmlDoc.matchList.searchMatchItem[i]
                            var szPlaybackURI = tempSearchMatchItem.playbackURI
                            if(szPlaybackURI.indexOf("name=") < 0) {
                                break
                            }
                            var szStartTime = tempSearchMatchItem.startTime
                            var szEndTime = tempSearchMatchItem.endTime
                            var szFileName = szPlaybackURI.substring(szPlaybackURI.indexOf("name=") + 5, szPlaybackURI.indexOf("&amp;size="))
                            var size=szPlaybackURI.substring(szPlaybackURI.indexOf("size=")+5)                            
                            // console.log("szPlaybackURI:"+szPlaybackURI)
                            // console.log("szFileName:"+szFileName)

                            var result={}
                            result.id="downloadTd" + i
                            result.order=this.g_iSearchTimes * 40 + (i + 1)
                            result.filename=szFileName
                            result.startTime=(szStartTime.replace("T", " ")).replace("Z", "")
                            result.endTime=(szEndTime.replace("T", " ")).replace("Z", "")
                            result.playbackURI=szPlaybackURI
                            result.size=(size/1000).toFixed(0)+'kB'
                            result.downloadProcess='-'
                            this.searchResult.push(result)
                        }
                    } else if("NO MATCHES" === xmlDoc.responseStatusStrg) {
                        setTimeout(function() {
                            // console.log(szDeviceIdentify + " 没有录像文件！")
                            notifyMaker(" 没有录像文件！")
                        }, 50)
                    }
                },
                error:  (status, xmlDoc)=> {
                    // console.log("error-xmlDoc:"+xmlDoc)
                    // console.log(szDeviceIdentify + " 搜索录像文件失败！", status, xmlDoc)
                    notifyMaker(" 搜索录像文件失败！")
                }
            })
        },

        // 下载录像
        clickStartDownloadRecord(item) {
            var szDeviceIdentify = this.szDeviceIdentify,
                szChannelID = this.selectedChannel,
                szFileName=item.filename,
                szPlaybackURI=item.playbackURI
            if (null == szDeviceIdentify) {
                return
            }

            this.g_iDownloadID = WebVideoCtrl.I_StartDownloadRecord(szDeviceIdentify, szPlaybackURI, szFileName, {
                bDateDir: true  //是否生成日期文件
            })

            if (this.g_iDownloadID < 0) {
                var iErrorValue = WebVideoCtrl.I_GetLastError()
                if (34 == iErrorValue) {
                    notifyMaker(" 已下载！",'success')
                } else if (33 == iErrorValue) {
                    notifyMaker(" 空间不足！")
                } else {
                    notifyMaker(" 下载失败！")
                }
            } else {
                // $("<div id='downProcess' class='freeze'></div>").appendTo("body");
                this.g_tDownloadProcess = setInterval(()=>this.downProcess(item), 1000)
            }
        },
        // 下载进度
        downProcess(item) {
            var iStatus = WebVideoCtrl.I_GetDownloadStatus(this.g_iDownloadID)
            if (0 == iStatus) {
                // $("#downProcess").css({
                //     width: $("#searchlist").width() + "px",
                //     height: "100px",
                //     lineHeight: "100px",
                //     left: $("#searchdiv").offset().left + "px",
                //     top: $("#searchdiv").offset().top + "px"
                // })
                var iProcess = WebVideoCtrl.I_GetDownloadProgress(this.g_iDownloadID)
                if (iProcess < 0) {
                    clearInterval(this.g_tDownloadProcess)
                    this.g_tDownloadProcess = 0
                    this.g_iDownloadID = -1
                } else if (iProcess < 100) {
                    item.downloadProcess=iProcess+'%'
                } else {
                    item.downloadProcess='100%'
                    // $("#downProcess").text("100%")
                    // setTimeout(function () {
                    //     $("#downProcess").remove()
                    // }, 1000)

                    WebVideoCtrl.I_StopDownloadRecord(this.g_iDownloadID)

                    notifyMaker("录像下载完成！",'success')
                    clearInterval(g_tDownloadProcess)
                    this.g_tDownloadProcess = 0
                    this.g_iDownloadID = -1
                }
            } else {
                WebVideoCtrl.I_StopDownloadRecord(this.g_iDownloadID)
                clearInterval(this.g_tDownloadProcess)
                this.g_tDownloadProcess = 0
                this.g_iDownloadID = -1
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
                        // showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
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
        }
    }
}
</script>
<style>
    @import '../css/video-operation.css';
</style>
