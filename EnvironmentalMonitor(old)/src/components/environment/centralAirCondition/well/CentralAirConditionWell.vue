<template>
    <div class="central-ac-well">
        <div class="central-ac-well__head">{{device.name}}</div>
        <div class="central-ac-well__subhead">{{device.groupName}}</div>
        <el-popover v-model="dialogVisible" trigger="click" width="400">
            <el-form :model="settingForm" ref="settingForm" size="small" label-width="120px">
                <el-form-item label="制冷温度">
                    <el-input v-model="settingForm.coolTemp" style="width:100px;"></el-input>
                </el-form-item>
                <el-form-item label="制热温度">
                    <el-input v-model="settingForm.warmTemp" style="width:100px;"></el-input>
                </el-form-item>
                <el-form-item label="工作模式" required>
                    <el-radio-group v-model="settingForm.workMode" size="medium">
                        <el-radio border :label="1">制热</el-radio>
                        <el-radio border :label="2">制冷</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="定时功能开关" required>
                    <el-radio-group v-model="settingForm.timing" size="medium">
                        <el-radio border :label="0">启动</el-radio>
                        <el-radio border :label="1">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="开关机设置1">
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" format="HH:mm" v-model="settingForm.startTime1" style="width: 100%;"></el-time-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center;">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" format="HH:mm" v-model="settingForm.endTime1" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="开关机设置2">
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" format="HH:mm" v-model="settingForm.startTime2" style="width: 100%;"></el-time-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center;">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" format="HH:mm" v-model="settingForm.endTime2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="开关机设置3">
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" format="HH:mm" v-model="settingForm.startTime3" style="width: 100%;"></el-time-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center;" >-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" format="HH:mm" v-model="settingForm.endTime3" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogVisible=false">确定</el-button>
                    <el-button @click="dialogVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
            <div class="central-ac-well__setting" slot="reference">
                <img src="../img/setting.png">
            </div>
        </el-popover>
        <div class="central-ac-well__content">
            <div class="central-ac-well__column" style="flex:2;">
                <central-ac-data-well :dataGroup="device.bigGroupData"></central-ac-data-well>
                <central-ac-status-well :statusGroup="device.bigGroupStatus"></central-ac-status-well>
            </div>
            <div class="central-ac-well__column" style="flex:1;">
                <central-ac-compressor-well :dataGroup="device.compressors"></central-ac-compressor-well>
                <central-ac-fin-well :dataGroup="device.finTemp"></central-ac-fin-well>
                <central-ac-outputtemp-well :dataGroup="device.unitOutputWaterTemp"></central-ac-outputtemp-well>
            </div>
            <div class="central-ac-well__column" style="flex:1;">
                <central-ac-press-status :dataGroup="device.unitPress"></central-ac-press-status>
                <central-ac-press-time :dataGroup="device.pressWorkTime"></central-ac-press-time>
                <central-ac-condenser :dataGroup="device.condensers"></central-ac-condenser>
            </div>
        </div> 
    </div>
</template>
<script>
import CentralACDataWell from './column1/CentralACDataWell.vue'
import CentralACStatusWell from './column1/CentralACStatusWell.vue'
import CentralACCompressorWell from './column2/CentralACCompressorWell.vue'
import CentralACFinWell from './column2/CentralACFinWell.vue'
import CentralACOutputTempWell from './column2/CentralACOutputTempWell.vue'
import CentralACPressStatusWell from './column3/CentralACPressStatusWell.vue'
import CentralACPressTimeWell from './column3/CentralACPressTimeWell.vue'
import CentralACCondenserWell from './column3/CentralACCondenserWell.vue'

export default {
    data(){
        return{
            dialogVisible:false,
            settingForm:{}
        }
    },
    props:['device'],
    components:{
        "central-ac-data-well":CentralACDataWell,
        "central-ac-status-well":CentralACStatusWell,
        "central-ac-compressor-well":CentralACCompressorWell,
        "central-ac-fin-well":CentralACFinWell,
        "central-ac-outputtemp-well":CentralACOutputTempWell,
        "central-ac-press-status":CentralACPressStatusWell,
        "central-ac-press-time":CentralACPressTimeWell,
        "central-ac-condenser":CentralACCondenserWell
    }
}
</script>
<style>
    @import '../css/central-ac-well.css';
</style>