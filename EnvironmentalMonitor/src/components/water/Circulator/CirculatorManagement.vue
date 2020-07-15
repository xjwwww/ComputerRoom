<template>
    <div class="ctm-container ctm-container_flex_row">
        <base-group-sidetree :sidetreeOpen.sync="sidetreeOpen" :groups="groups" :selectedDevices.sync="selectedDevices"></base-group-sidetree>

        <div :class="['ctm-content ctm-content__main',sidetreeOpen?'ctm-content__main_close':'ctm-content__main_open']">
            <div class="ctm-container ctm-container_flex_column">
                <div class="ctm-manage-table">
                    <div class="manage-table-operation">
                        <div class="manage-table-operation__part table-operation__part_position_left">
                            <button type="button" class="manage-table-operation__button manage-table-operation__button_function_refresh" @click="refresh">刷新</button>
                            <button type="button" class="manage-table-operation__button manage-table-operation__button_function_export" @click="openDialog('add')">新增</button>
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
                        <el-table-column prop="name" label="设备名称" min-width="60" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="address" label="设备地址" min-width="40" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="groupName" label="所在分组" min-width="50" align="center" head-align="center"></el-table-column>
                        <el-table-column label="温度区间"  min-width="50" align="center" head-align="center">
                            <template slot-scope="scope">
                                {{scope.row.tempMinimum}}~{{scope.row.tempMaximum}}
                            </template>
                        </el-table-column>
                        <el-table-column label="含氧量区间"  min-width="50" align="center" head-align="center">
                            <template slot-scope="scope">
                                {{scope.row.edomO2Minimum}}~{{scope.row.edomO2Maximum}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="timeInterval" label="保存间隔"  min-width="40" align="center" head-align="center"></el-table-column>
                        <el-table-column label="IP地址"  min-width="80" align="center" head-align="center">
                            <template slot-scope="scope">
                                {{ipMap[scope.row.ipId].address}}:{{ipMap[scope.row.ipId].port}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作"  align="center" head-align="center" min-width="100" v-if="hasPermission">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="openDialog('update',scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="deleteOperation(scope.row.deviceId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <base-table-pagination :total="deviceSettingsToBeFiltered.length" :pageSize.sync="pageSize"  :currentPage.sync="currentPage"></base-table-pagination>
            </div>
        </div>

        <el-dialog :title="dialogMode=='add'?'设备添加':'设备编辑'" :visible.sync="dialogVisible" width="400px" center custom-class="ctm-dialog">
            <el-form ref="deviceForm" :model="deviceForm" :rules="deviceFormRules" label-width="80px" size="small">
              <el-form-item label="设备地址" prop="address">
                <el-select v-model="deviceForm.address" placeholder="请选择" style="width:90%;" :disabled="dialogMode==='add'?false:true">
                    <el-option v-for="item in 20" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属分组" prop="groupId">
                <el-cascader :options="this.$store.getters.groups" :props="groupsProps" placeholder="请选择分组" v-model="deviceForm.groupId" style="width:90%;" :disabled="dialogMode==='add'?false:true">
                    <template slot-scope="{ node, data }">
                      <span>{{ data.name }}</span>
                    </template>
                </el-cascader>
              </el-form-item>
              <el-form-item label="ip地址" prop="ipId">
                <el-select v-model="deviceForm.ipId" placeholder="请选择" style="width:90%;" :disabled="dialogMode==='add'?false:true">
                    <el-option v-for="item in ipMap" :key="item.id" :label="item.address+':'+item.port" :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备名称" prop="name">
                <el-input v-model="deviceForm.name" type="text" style="width:90%;"></el-input>
              </el-form-item>
              <!-- <el-form-item label="设备协议">
                <el-select v-model="deviceForm.protocolId" placeholder="请选择" style="width:90%;">
                    <el-option v-for="item in protocols" :key="item.id" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="温度区间" required>
                    <el-col :span="9">
                        <el-form-item prop="tempMinimum" style="margin-bottom:0;">
                            <el-input v-model="deviceForm.tempMinimum" type="text"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center;">-</el-col>
                    <el-col :span="9">
                        <el-form-item prop="tempMaximum" style="margin-bottom:0;">
                            <el-input v-model="deviceForm.tempMaximum" type="text"></el-input>
                        </el-form-item>
                    </el-col>
              </el-form-item>
              <el-form-item label="含氧量区间" required>
                    <el-col :span="9">
                        <el-form-item prop="edomO2Minimum" style="margin-bottom:0;">
                            <el-input v-model="deviceForm.edomO2Minimum" type="text"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center;">-</el-col>
                    <el-col :span="9">
                        <el-form-item prop="edomO2Maximum" style="margin-bottom:0;">
                            <el-input v-model="deviceForm.edomO2Maximum" type="text"></el-input>
                        </el-form-item>
                    </el-col>
              </el-form-item>
              <el-form-item label="保存间隔" prop="timeInterval">
                <el-input v-model.number="deviceForm.timeInterval" type="text" style="width:90%;"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <div style="width:50%;">
                <button @click="handleDialog" class="create">确 定</button>
              </div>
              <div style="width:50%;">
                <button @click="dialogVisible = false" class="cancel">取 消</button>
              </div>                    
            </span>
        </el-dialog>

    </div>
</template>
<script>
import {floatPass} from '@/js/util/util.js'
import mixinScript from '@/components/base/tab/management/script.js'

export default {
    mixins: [mixinScript],
    data(){
        return{
            deviceFormRules:{
                address:[
                    { required: true, message: '请选择地址'}
                ],
                groupId:[
                    { required: true, message: '请选择分组'}
                ],
                name:[
                    { required: true, message: '输入名字'},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                ipId:[
                    { required: true, message: '请选择ip地址'}
                ],
                tempMinimum:[
                    { required: true, validator: floatPass, trigger: 'blur'}
                ],
                tempMaximum:[
                    { required: true, validator: floatPass, trigger: 'blur'}
                ],
                edomO2Minimum:[
                    { required: true, validator: floatPass, trigger: 'blur'}
                ],
                edomO2Maximum:[
                    { required: true, validator: floatPass, trigger: 'blur'}
                ],
                timeInterval:[
                    { required: true, message: '时间不能为空'},
                    { type: 'number', message: '时间必须为数字值'},
                ],
            },
        }
    },
}
</script>
<style>
    @import '~@/css/page.css';
    @import '~@/css/components/base/tab/base-dialog-group.css';
    @import '~@/css/components/base/tab/base-manage-table.css';
</style>