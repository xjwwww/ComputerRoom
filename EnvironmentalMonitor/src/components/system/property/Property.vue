<template>
    <div class="ctm-content">
        <div class="ctm-container">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label" class="ctm-tab-label">实时数据</span>                    
                    <base-middle-device-exhibition ref="deviceExhibition" :groups="groups" :deviceWell="deviceWell"></base-middle-device-exhibition>
                </el-tab-pane>
                <el-tab-pane lazy>
                    <span slot="label" class="ctm-tab-label">报警数据</span>
                    <base-alarm-inquiry :groups="groups" :query="query"></base-alarm-inquiry>
                </el-tab-pane>
                <el-tab-pane lazy>
                    <span slot="label" class="ctm-tab-label">设备管理</span>
                    <management ref="management" :groups="groups" @transferBuild="build" :devices="devices" :properties="properties"></management>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import Management from './PropertyManagement.vue'
    import {initGroupsReflect,deepClone,queryIntervalTime} from '../../../js/util/util.js'
    import query from '../../../js/query/system/propertyQuery.js'
    import deviceWell from './PropertyDeviceWell.vue'

    export default{
        data(){
            return {
                groups:[],
                groupsReflect:{},
                statusInterval:null,
                devices:[],
                devicesReflect:{},
                deviceWell:deviceWell,
                properties:[],
                propertiesReflect:{},
                query:query
            }           
        },
        components:{
            'management':Management
        },
        methods:{
            getDevices(){
                return this.query.getDevices()
                .then(data=>{
                        this.devices=data
                        this.devices.forEach(element=>this.devicesReflect[element.deviceId]=element)
                    }
                )
            },
            build(){
                Promise.all([this.getDevices(),this.$store.dispatch('group/updateGroups'),this.getProperties()])
                .then(()=>{
                    this.groups=deepClone(this.$store.getters.groups)
                    initGroupsReflect(this.groups[0],this.groupsReflect)
                    this.addPropertyToGroup(this.properties,this.groupsReflect)
                    this.addDeviceToProperties()
                    this.$refs.deviceExhibition.selectedDevices=this.devices
                    if(this.$refs.management)
                        this.$refs.management.selectedDevices=this.devices
                })
            },
            checkStatus(){
                return this.query.checkStatus()
                .then(statusInfo=>{
                    statusInfo.forEach(element=>this.devicesReflect[element.id].status=element.status)
                })
            },
            getProperties(){
                return this.query.getProperties()
                .then(data=>{
                        this.properties=data
                        this.properties.forEach(element=>this.propertiesReflect[element.propertyId]=element)
                    }
                )
            },
            addPropertyToGroup(devices,groupsArray){
                devices.forEach(element=>{
                    if(!groupsArray[element.groupId].group)
                        groupsArray[element.groupId].group=[]
                    groupsArray[element.groupId].group.push(element)
                    element.groupName=groupsArray[element.groupId].name
                })
            },
            addDeviceToProperties(){
                this.devices.forEach(element=>{
                    let property=this.propertiesReflect[element.propertyId]
                    if(!property.devices)
                        property.devices=[]
                    property.devices.push(element)
                    element.propertyName=property.name
                })
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
    @import '../../../css/page.css';
</style>