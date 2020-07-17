<template>
    <div class="server-well">
        <server-cpu-well v-if="flag" :cpuUsage="message" style="flex:2;"></server-cpu-well>
        <server-swap-well v-if="flag" :swapUsage="message" style="flex:1;"></server-swap-well>
        <server-memory-well v-if="flag" :memoryUsage="message" style="flex:1;"></server-memory-well>
        <server-disk-well v-if="flag" :diskUsage="diskList" style="flex:2;"></server-disk-well>
    </div>
</template>
<script>
    import ServerCPUWell from './ServerCPUWell.vue'
    import ServerSwapWell from './ServerSwapWell.vue'
    import ServerMemoryWell from './ServerMemoryWell.vue'
    import ServerDiskWell from './ServerDiskWell.vue'
    
    export default{
        props:['server'],
        data(){
            return {
                message: null,
                diskList: null,
                flag: false
            }
        },
        watch: {
            server: {
                handler(val){
                    this.message = val.computerMessage
                    this.diskList = val.diskList
                },
                immediate: true,
                deep: true
            }
        },
        components:{
            'server-cpu-well':ServerCPUWell,
            'server-swap-well':ServerSwapWell,
            'server-memory-well':ServerMemoryWell,
            'server-disk-well':ServerDiskWell
        },
        created(){

            this.message = this.server.computerMessage
            this.diskList = this.server.diskList

            if(this.message != undefined && this.diskList != undefined){

                this.flag = true;
            }


        },
        
    }
</script>
<style>
    @import '../css/server-well.css';
</style>