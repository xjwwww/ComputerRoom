<template>
    <div class="ctm-content">
        <div class="ctm-container">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label" class="ctm-tab-label">空调操控</span>
                    <base-middle-device-exhibition ref="deviceExhibition" :groups="groups" :deviceWell="deviceWell" ></base-middle-device-exhibition>
                </el-tab-pane>
                <el-tab-pane lazy>
                    <span slot="label" class="ctm-tab-label">设备管理</span>
                    <management ref="management" :query="query" :groups="groups" @transferBuild="build" :devices="devices"></management>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import {build} from '@/js/util/util.js'
    import query from './fissionACQuery.js'
    import deviceWell from './FissionAirConditionWell.vue'
    import Management from './FissionAirConditionManagement.vue'

    export default{
        data(){
            return {
                groups:[],
                groupsReflect:{},
                devices:{},
                // devicesReflect:{},
                deviceWell:deviceWell,
                query:query
            }           
        },
        components:{
            'management':Management
        },
        created(){
            this.build()
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
        }
    }

</script>
<style>
    @import '~@/css/page.css';
</style>