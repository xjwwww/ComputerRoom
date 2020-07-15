<template>  
    <div class="ctm-body">
        
        <monitor-header/>
        <router-view></router-view>

    </div>
  
</template>
<script>
    // import DeviceItem from './components/monitorpage/DeviceItem.vue'
    // import register from './components/register.js'
    // import {mapGetters} from 'vuex'
    import MonitorHeader from '@/components/header/MonitorHeader.vue'
    import  "babel-polyfill"

    export default {
        
        components:{
            'monitor-header':MonitorHeader
        }
    }
</script>
<style>
    @import './css/page.css';
    /* @import './css/monitorpage/page-navigator.css';
    @import '~@/css/components/base/tab/base-dialog-group.css'; */
</style>
