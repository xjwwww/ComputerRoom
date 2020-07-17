<template>
    <!-- 8060设备 -->
    <div class="property-device-well">
        <div class="img">
            <el-image style="height:100%;width:100%;">
                <div slot="error" class="image-error-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
        </div>
        <div class="data">
            <div class="device-name">{{device.name}}</div>
            <div class="device-place">{{device.propertyName}}</div>
            <div class="device-value" v-if="device.status===0">正常</div>
            <div class="device-value" v-else-if="device.status===1" style="color:red;">异常</div>
            <div class="device-value" v-else style="color:gray;">未连接</div>
            <div>
                <el-select v-model="light" placeholder="灯光状态" size="mini">
                    <el-option v-for="item in lights" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
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
    @import '../../../css/components/system/property/property-device-well.css';
</style>