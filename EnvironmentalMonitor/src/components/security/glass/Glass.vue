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
    import deviceWell from './GlassWell.vue'

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
                return this.query.getDevicesByDeviceTypeId(8)
                .then(data=>{
                        // this.devices=data
                        // this.devices.forEach(element=>this.devicesReflect[element.deviceId]=element)
                        data.forEach(element=>this.devices[element.deviceId]=element)
                    }
                )
            },
            build(){
                this.getDevices()
                .then(()=>{
                    build.call(this)
                })
            },
            checkStatus(){
                return this.query.checkStatusByDeviceTypeId(8)
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