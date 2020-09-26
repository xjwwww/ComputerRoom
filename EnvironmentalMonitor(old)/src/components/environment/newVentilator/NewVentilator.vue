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
    import deviceWell from './NewVentilatorWell.vue'

    export default{
        data(){
            return {
                groups:[],
                groupsReflect:{},
                devices:{},//处理完成后的数据
                // devicesReflect:{},
                deviceWell:deviceWell,
            }           
        },
        methods:{
            getDevices(){
                return query.getDevicesByDeviceTypeId(2)
                .then(data=>{
                     data.forEach(element=>this.devices[element.deviceId]=element)
                    //   data.forEach(element=>{console.log(element)})
                    //  this.devices.forEach(element=>this.devicesReflect[element.deviceId]=element)
                    }
                )
            },
            build(){
                build.call(this)
            }
        },
        created(){
            this.build()
        },
    }

</script>
<style>
    @import '~@/css/page.css';
</style>