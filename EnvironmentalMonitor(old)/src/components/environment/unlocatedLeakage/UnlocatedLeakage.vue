<template>
    <div class="ctm-content">
        <div class="ctm-container">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label" class="ctm-tab-label">实时数据</span>
                    <base-device-exhibition ref="deviceExhibition" :groups="groups" :deviceWell="deviceWell"></base-device-exhibition>
                </el-tab-pane>
                <el-tab-pane lazy>
                    <span slot="label" class="ctm-tab-label">报警数据</span>
                    <base-alarm-inquiry :groups="groups" :query="query"></base-alarm-inquiry>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import {build,queryIntervalTime} from '@/js/util/util.js'
    import query from '@/js/query/system/onOffReadQuery.js'
    import deviceWell from './UnlocatedLeakageWell.vue'

    export default{
        data(){
            return {
                groups:[],
                groupsReflect:{},
                statusInterval:null,
                devices:{},
                // devicesReflect:{},
                deviceWell:deviceWell,
                query:query
            }
        },
        methods:{
            getDevices(){
                return query.getDevicesByDeviceTypeId(1)
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
            checkStatus(){
                return query.checkStatusByDeviceTypeId(1)
                .then(statusInfo=>
                        statusInfo.forEach(element=>{
                            Object.assign(this.devices[element.id],element)
                        })
                )
            }
        },
        created(){
            this.build()
        },
        mounted(){
            this.statusInterval=setInterval(()=>{
                this.checkStatus()
            },queryIntervalTime)
        },
        beforeDestroy(){
            clearInterval(this.statusInterval)
        }
    }

</script>
<style>
    @import '~@/css/page.css';
</style>