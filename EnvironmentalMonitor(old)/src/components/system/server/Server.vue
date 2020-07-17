<template>
    <div class="ctm-content">
        <div class="ctm-container">
            <!-- <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label" class="ctm-tab-label">实时数据</span>
                    <base-middle-device-exhibition ref="deviceExhibition" :deviceWell="deviceWell" :groups="groups"></base-middle-device-exhibition>
                </el-tab-pane>
            </el-tabs> -->

            <server-well v-if="flag" :server="server"></server-well>
        </div>
    </div>
</template>
<script>
    import query from './serverQuery.js' 
    import serverWell from './well/ServerWell.vue'
    import {queryIntervalTime,build} from '@/js/util/util.js'

    export default{
        data(){
            return{
                query:query,
                server: null,
                flag: false,
                statusInterval: undefined
            }
        },
        methods:{
            getServer(){
                let that = this;

                return this.query.getDevices()
                .then(data=>{
                        //console.log(data)

                        that.server = data[0]
                        that.flag = true;
                        //console.log(that.server)
                    }
                )
            },
            // checkStatus(){
            //     return this.query.checkStatus()
            //     .then(
            //         statusInfo=> {
            //             console.log(statusInfo)
            //             statusInfo.forEach(element=>{
            //                 this.server = element
            //             })
            //         }
            //     )
               
            // },
            build(){
                build.call(this)
            }
        },
        watch: {
            server: {   
                handler(val){
                    this.server = val
                    //console.log(this.server)
                },
                immediate: true,
                deep: true
            }
        },
        created(){
            this.getServer()
            //this.build()
        },
        mounted(){
            this.statusInterval=setInterval(()=>{
                this.getServer()
            },queryIntervalTime)
        },
        beforeDestroy(){
            clearInterval(this.statusInterval)
        },
        components:{
            'server-well':serverWell
        }
        
    }

</script>
<style>
    @import '~@/css/page.css';
</style>