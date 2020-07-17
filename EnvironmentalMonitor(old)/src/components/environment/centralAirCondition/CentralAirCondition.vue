<template>
    <div class="ctm-content">
        <div class="ctm-container">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label" class="ctm-tab-label">实时数据</span>
                    <base-large-device-exhibition ref="deviceExhibition" :groups="groups" :deviceWell="deviceWell"></base-large-device-exhibition>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import {build} from '@/js/util/util.js'
    import query from './centralAirConditionQuery.js' 
    import deviceWell from './well/CentralAirConditionWell.vue'

    export default{
        data(){
             return {
                groups:[],
                groupsReflect:{},
                statusInterval:null,
                devices:{},
                // devicesReflect:{},
                query:query,
                deviceWell:deviceWell
            }
        },
        methods:{
            getDevices(){
                return this.query.getDevices()
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