<template>
    <div class="ctm-content">
        <div class="ctm-container">
            <el-tabs type="border-card">
                <el-tab-pane>
                  <span slot="label" class="ctm-tab-label">IP设置</span>
                  <device-ip-management></device-ip-management>
                </el-tab-pane>
                <el-tab-pane lazy>
                  <span slot="label" class="ctm-tab-label">8060模块</span>
                  <device-on-off-write-management></device-on-off-write-management>
                </el-tab-pane>
                <el-tab-pane lazy>
                  <span slot="label" class="ctm-tab-label">8052模块</span>
                  <deivice-on-off-read-management></deivice-on-off-read-management>
                </el-tab-pane>
                <el-tab-pane lazy>
                  <span slot="label" class="ctm-tab-label">报警设置</span>
                  <deivice-alarm-set></deivice-alarm-set>
                </el-tab-pane>
                <el-tab-pane lazy>
                  <span slot="label" class="ctm-tab-label">资产管理</span>
                  <deivice-property-management></deivice-property-management>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
  import DeviceIPManagement from './tab/DeviceIPManagement.vue'
  import DeviceOnOffReadManagement from './tab/DeviceOnOffReadManagement.vue'
  import DeviceOnOffWriteManagement from './tab/DeviceOnOffWriteManagement.vue'
  import DeviceAlarmSet from './tab/DeviceAlarmSet.vue'
  import DevicePropertyManagement from './tab/DevicePropertyManagement.vue'

  export default{
    components:{
      'device-ip-management':DeviceIPManagement,
      'deivice-on-off-read-management':DeviceOnOffReadManagement,
      'device-on-off-write-management':DeviceOnOffWriteManagement,
      'deivice-alarm-set':DeviceAlarmSet,
      'deivice-property-management':DevicePropertyManagement
    },
  }
</script>
<style>
  @import '~@/css/page.css';
</style>