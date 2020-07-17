<template>
    <div class="ctm-content">
        <div class="ctm-container">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label" class="ctm-tab-label">实时数据</span>
                    <base-middle-device-exhibition ref="deviceExhibition" :deviceWell="deviceWell" :groups="groups"></base-middle-device-exhibition>
                </el-tab-pane>
                <!-- <el-tab-pane label="报警数据" lazy>
                    <base-alarm-inquiry :groups="groups"></base-alarm-inquiry>
                </el-tab-pane> -->
                <!-- <el-tab-pane label="设备管理" lazy>
                    <battery-management :groups="groups"></battery-management>
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import {build} from '@/js/util/util.js'
    import query from './batteryQuery.js' 
    import deviceWell from './well/BatteryWell.vue'

    export default{
        data(){
            return{
                groups:[],
                groupsReflect:{},
                statusInterval:null,
                devices:{},
                // devicesReflect:{},
                deviceWell:deviceWell,
            }
        },
        components:{
            // 'battery-management':batteryManagement
        },
        methods:{
            getDevices(){
                return query.getDevices()
                .then(data=>{
                        // this.devices=data
                        // this.devices.forEach(element=>this.devicesReflect[element.deviceId]=element)
                        data.forEach(element=>this.devices[element.deviceId]=element)
                    }
                )
            },
            build(){
                build.call(this)
            },
        },
        created(){
            this.build()
        },
    }

</script>
<style>
    @import '~@/css/page.css';
</style>