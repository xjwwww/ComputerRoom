<template>  
        <div class="ctm-body">
            <monitor-header/>
            <router-view></router-view>
        </div>
  
</template>
<script>

    import MonitorHeader from '@/components/header/MonitorHeader.vue'

        export default {
            components:{
                'monitor-header':MonitorHeader
            }
        }
</script>
<style>

    @import './css/page.css';
    
</style>
