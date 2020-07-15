<template>
    <div class="ctm-content">
        <div class="ctm-container">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label" class="ctm-tab-label">用户管理</span>
                    <account-management :roles.sync="roles"></account-management>
                </el-tab-pane>
                <el-tab-pane lazy>
                    <span slot="label" class="ctm-tab-label">角色管理</span>
                    <role-management :roles.sync="roles" :permissions.sync="permissions"></role-management>
                </el-tab-pane>
                <el-tab-pane lazy>
                    <span slot="label" class="ctm-tab-label">权限管理</span>
                    <permission-management :permissions.sync="permissions"></permission-management>
                </el-tab-pane>
            </el-tabs>
		</div>
    </div>
</template>
<script>
import AccountManagement from './tab/AccountManagement.vue'
import RoleManagement from './tab/RoleManagement.vue'
import PermissionManagement from './tab/PermissionManagement.vue'

export default{
    data(){
        return{
            roles:undefined,
            permissions:undefined
        }
    },
    components:{
      'account-management':AccountManagement,
      'role-management':RoleManagement,
      'permission-management':PermissionManagement,
    },  
}

</script>
<style>
   @import '~@/css/page.css';
</style>