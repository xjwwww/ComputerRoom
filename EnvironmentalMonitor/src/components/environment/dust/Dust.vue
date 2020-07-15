<template>
    <div class="ctm-content">
        <div class="ctm-container">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label" class="ctm-tab-label">实时数据</span>                    
                    <base-device-exhibition ref="deviceExhibition" :deviceWell="deviceWell" :groups="groups"></base-device-exhibition>
                </el-tab-pane>
                <el-tab-pane lazy>
                    <span slot="label" class="ctm-tab-label">报警数据</span>
                    <base-alarm-inquiry :groups="groups" :query="query"></base-alarm-inquiry>
                </el-tab-pane>
                <el-tab-pane lazy>
                    <span slot="label" class="ctm-tab-label">设备管理</span>
                    <management ref="management" :groups="groups" :query="query" @transferBuild="build" :devices="devices"></management>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import Management from './DustManagement.vue'
    import {queryIntervalTime,build} from '@/js/util/util.js'
    import query from './dustQuery.js'
    import deviceWell from './DustWell.vue'

    export default{
        data(){
            return{
                groups:[],
                groupsReflect:{},
                statusInterval:null,
                devices:{},
                // devicesReflect:{},
                deviceWell:deviceWell,
                query:query
            }
        },
        components:{
            'management':Management
        },
        methods:{
            getDevices(){
                return this.query.getDevices()
                .then(data=> {
                        data.forEach(element=>this.devices[element.deviceId]=element)                        
                    }
                )
            },
            build(){
                build.call(this)
            },
            checkStatus(){
                return this.query.checkStatus()
                .then(
                    statusInfo=> {
                        statusInfo.forEach(element=>
                            Object.assign(this.devices[element.id],element)
                        )
                    }
                )
            },
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
    @import '../../../css/page.css';
</style>