<template>
    <div class="ctm-container ctm-container_flex_row">
        <base-group-sidetree :sidetreeOpen="sidetreeOpen" :groups="groups"  @transferSidetreeOpen="getSidetreeOpen" @transferSelectedDevices="getSelectedDevices"></base-group-sidetree>

        <div :class="['ctm-content ctm-content__main',sidetreeOpen?'ctm-content__main_close':'ctm-content__main_open']">
            <div class="ctm-container ctm-container_flex_column">
                <div class="ctm-manage-table">
                    <div class="manage-table-operation">
                        <div class="manage-table-operation__part table-operation__part_position_left">
                            <button type="button" class="manage-table-operation__button manage-table-operation__button_function_refresh">刷新</button>
                            <button type="button" class="manage-table-operation__button manage-table-operation__button_function_export">新增</button>
                        </div>
                        <div class="manage-table-operation__part table-operation__part_position_right">
                            <div class="search-keyword"> 
                                <!-- <el-popover placement="top-start" width="200" trigger="hover" content="此处对IP地址进行过滤"> -->
                                <!-- <input type="text" placeholder="关键字过滤" class="ctm-input" slot="reference" v-model="keyword"> -->
                                <!-- </el-popover> -->
                                <input type="text" placeholder="关键字过滤" class="ctm-input manage-table-operation__input" v-model="keyword">
                            </div>
                        </div>
                    </div>
                    <el-table :data="deviceSettingsToBeShown" border style="width: 100%" size="mini" height="calc(100% - 48px)">
                        <el-table-column prop="address" label="设备地址" min-width="50" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="name" label="设备名称" min-width="80" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="place" label="所在位置" min-width="80" align="center" head-align="center"></el-table-column>
                        <el-table-column label="电压区间"  min-width="50" align="center" head-align="center">
                            <template slot-scope="scope">
                                {{scope.row.volMinimum}}~{{scope.row.volMaximum}}
                            </template>
                        </el-table-column>
                        <el-table-column label="内阻区间"  min-width="50" align="center" head-align="center">
                            <template slot-scope="scope">
                                {{scope.row.resMinimum}}~{{scope.row.resMaximum}}
                            </template>
                        </el-table-column>
                        <el-table-column label="温度区间"  min-width="50" align="center" head-align="center">
                            <template slot-scope="scope">
                                {{scope.row.tempMinimum}}~{{scope.row.tempMaximum}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="timeInterval" label="保存间隔"  min-width="50" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="ipAddress" label="IP地址"  min-width="80" align="center" head-align="center"></el-table-column>
                        <el-table-column label="操作"  align="center" head-align="center" min-width="100" v-if="hasPermission">
                            <template slot-scope="scope">
                                <el-button size="mini">编辑</el-button>
                                <el-button size="mini" type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <base-table-pagination :total="deviceSettingsToBeFiltered.length" @transferPageSize="getPageSize"  @transferCurrentPage="getCurrentPage"></base-table-pagination>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    
    data(){
        return{
            sidetreeOpen:true,
            keyword:'',
            selectedDevices:[],
            pageSize:10,
            currentPage:1
        }
    },
    props:['groups'],
    methods:{
        getSelectedDevices(data){
            this.selectedDevices=data;
        },
        getSidetreeOpen(data){
            this.sidetreeOpen=data;
        },
        getPageSize(data){
            this.pageSize=data;
        },
        getCurrentPage(data){
            this.currentPage=data;
        }
    },
    computed:{
        deviceSettingsToBeFiltered(){
            return this.selectedDevices.filter(device=>(device.ipAddress.indexOf(this.keyword)!=-1));
        },

        deviceSettingsToBeShown(){
            return this.deviceSettingsToBeFiltered.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        }
    },
}
</script>
<style>
    @import '../../../css/page.css';
    @import '../../../css/components/base/tab/base-dialog-group.css';
    @import '../../../css/components/base/tab/base-manage-table.css';
    
</style>