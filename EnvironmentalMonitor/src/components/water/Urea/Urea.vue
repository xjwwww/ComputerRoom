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
                    <span slot="label" class="ctm-tab-label">历史曲线</span>                    
                    <base-history-inquiry :groups="groups" :setting="historySetting" :query="query"></base-history-inquiry>
                </el-tab-pane>
                <el-tab-pane lazy>
                    <span slot="label" class="ctm-tab-label">设备管理</span>
                    <management ref="management" :groups="groups" @transferBuild="build" :devices="devices" :query="query"></management>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import {queryIntervalTime,build} from '@/js/util/util.js'
    import query from './ureaQuery.js'
    import deviceWell from './UreaWell.vue'
    import Management from './UreaManagement.vue'

    export default{
        data(){
            return{
                groups:[],
                groupsReflect:{},
                statusInterval:null,
                devices:{},
                // devicesReflect:{},
                historySetting:{
                    yAxis:[
                       { 
                            name:'尿素浓度',
                            unit:'',
                            min:0,
                            max:100,
                            datas:[
                                {name:'尿素浓度',attr:'value'}
                            ]
                       },
                    ]
                },
                query:query,
                deviceWell:deviceWell
            }
        },
        components:{
            'management':Management
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
            checkStatus(){
                return query.checkStatus()
                .then(
                    statusInfo=> {
                        statusInfo.forEach(element=>{
                            Object.assign(this.devices[element.id],element)
                        })
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
    @import '~@/css/page.css';
</style>