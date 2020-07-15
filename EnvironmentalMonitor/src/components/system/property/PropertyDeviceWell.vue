<template>
    <!-- 8060设备 -->
    <div class="property-device-well">
        <div class="property-device-well__header">
            <img src="./img/normal.png" v-if="device.status===0" width="30px">
            <img src="./img/alarm.png" v-else-if="device.status===1" width="30px">
            <img src="./img/unconnected.png" v-else-if="device.status===2" width="30px">
            <div class="property-device-well__status" v-if="device.status===0">正常</div>
            <div class="property-device-well__status" v-else-if="device.status===1">报警</div>
            <div class="property-device-well__status" v-else-if="device.status===2">未连接</div>
        </div>
        <div class="property-device-well__content">
            <div class="property-device-row">
                <div class="property-device-row__left">设备名称</div>
                <div class="property-device-row__right">{{device.name}}</div>
            </div>
            <div class="property-device-row">
                <div class="property-device-row__left">颜色</div>
                <div class="property-device-row__right">
                    <el-select v-model="light" placeholder="灯光状态" size="mini" style="width:120px;">
                        <el-option v-for="item in lights" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import query from '../../../js/query/system/propertyQuery.js'

export default {
    data(){
        return{
            lights:[
                {id:0,name:'熄灭'},
                {id:1,name:'红'},
                {id:2,name:'紫'},
                {id:3,name:'黄'},
                {id:4,name:'绿'},
                {id:5,name:'青'},
                {id:6,name:'蓝'},
                {id:7,name:'白'},
                {id:8,name:'红闪烁'},
                {id:9,name:'紫闪烁'},
                {id:10,name:'黄闪烁'},
                {id:11,name:'绿闪烁'},
                {id:12,name:'青闪烁'},
                {id:13,name:'蓝闪烁'},
                {id:14,name:'白闪烁'},
            ],
            light:undefined
        }
    },
    props:['device'],
    watch: {
        light(val) {
            query.changeDeviceColor(this.device.deviceId,val)
        },
    },
}
</script>
<style>
    @import './property-device-well.css';
</style>