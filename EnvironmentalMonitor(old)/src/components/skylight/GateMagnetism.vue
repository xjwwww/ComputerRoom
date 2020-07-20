<template>
    <div class="ctm-content">
        <div class="ctm-container">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label" class="ctm-tab-label">开关控制</span>
                    <base-device-exhibition  ref="deviceExhibition" :groups="groups" :deviceWell="deviceWell"></base-device-exhibition>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import {build} from '@/js/util/util.js'
    import query from '@/js/query/system/onOffWriteQuery.js'
    import deviceWell from './GateMagnetismWell.vue'

    export default{
        data(){
            return {
                groups:[],
                groupsReflect:{},
                devices:{},
                // devicesReflect:{},
                deviceWell:deviceWell,
            }           
        },
        methods:{
            getDevices(){
                return query.getDevicesByDeviceTypeId(3)
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
            console.log("消防门磁")
            this.build()
        },
    }

</script>
<style>
    @import '~@/css/page.css';
</style>