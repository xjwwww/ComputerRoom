<template>
    <div class="ctm-container ctm-container_flex_row">
        <base-group-sidetree :sidetreeOpen.sync="sidetreeOpen" :groups="groups" :selectedDevices.sync="selectedDevices"></base-group-sidetree>

        <div :class="['ctm-content ctm-content__main',sidetreeOpen?'ctm-content__main_close':'ctm-content__main_open']">
            <div class="ctm-container ctm-container_flex_column">
                <div class="ctm-manage-table">
                    <base-management-table-operation :keyword.sync="keyword" @openDialog="openDialog" @refresh="refresh"></base-management-table-operation>
                    
                    <el-table :data="deviceSettingsToBeShown" border style="width: 100%" size="mini" height="calc(100% - 48px)">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <div class="expand-data">
                                    <div class="expand-data-area">
                                        <div class="expand-data-area__header">
                                            <div class="expand-data-area__th" style="width:33%;">参数名称</div>
                                            <div class="expand-data-area__th" style="width:66%;">参数范围</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">A相电压</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinAvol}}~{{props.row.pemMaxAvol}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">A相电流</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinAcur}}~{{props.row.pemMaxAcur}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">AB相电压</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinABvol}}~{{props.row.pemMaxABvol}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">A相有功功率</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinApap}}~{{props.row.pemMaxApap}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">A相无功功率</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinAprp}}~{{props.row.pemMaxAprp}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">A相功率因素</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinAppf}}~{{props.row.pemMaxAppf}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">总有功功率</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinTpap}}~{{props.row.pemMaxTpap}}</div>
                                        </div>
                                    </div>
                                    <div class="expand-data-area">
                                        <div class="expand-data-area__header">
                                            <div class="expand-data-area__th" style="width:33%;">参数名称</div>
                                            <div class="expand-data-area__th" style="width:66%;">参数范围</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">B相电压</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinBvol}}~{{props.row.pemMaxBvol}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">B相电流</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinBcur}}~{{props.row.pemMaxBcur}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">BC相电压</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinBCvol}}~{{props.row.pemMaxBCvol}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">B相有功功率</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinBpap}}~{{props.row.pemMaxBpap}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">B相无功功率</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinBprp}}~{{props.row.pemMaxBprp}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">B相功率因素</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinBppf}}~{{props.row.pemMaxBppf}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">总无功功率</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinTprp}}~{{props.row.pemMaxTprp}}</div>
                                        </div>
                                    </div>
                                    <div class="expand-data-area">
                                        <div class="expand-data-area__header">
                                            <div class="expand-data-area__th" style="width:33%;">参数名称</div>
                                            <div class="expand-data-area__th" style="width:66%;">参数范围</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">C相电压</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinCvol}}~{{props.row.pemMaxCvol}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">C相电流</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinCcur}}~{{props.row.pemMaxCcur}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">CA相电压</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinCAvol}}~{{props.row.pemMaxCAvol}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">C相有功功率</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinCpap}}~{{props.row.pemMaxCpap}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">C相无功功率</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinCprp}}~{{props.row.pemMaxCprp}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">C相功率因素</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinCppf}}~{{props.row.pemMaxCppf}}</div>
                                        </div>
                                        <div class="expand-data-area__data">
                                            <div class="expand-data-area__td" style="width:33%;">总功率因素</div>
                                            <div class="expand-data-area__td" style="width:66%;">{{props.row.pemMinTppf}}~{{props.row.pemMaxTppf}}</div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="设备地址" min-width="50" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="name" label="设备名称" min-width="80" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="groupName" label="所在分组" min-width="50" align="center" head-align="center"></el-table-column>
                        <el-table-column prop="timeInterval" label="保存间隔"  min-width="50" align="center" head-align="center"></el-table-column>
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

        <el-dialog :title="dialogMode=='add'?'设备添加':'设备编辑'" :visible.sync="dialogVisible" width="900px" center custom-class="ctm-dialog">
            <el-form ref="deviceForm" :model="deviceForm" :rules="deviceFormRules" label-width="100px" size="small" :inline="true">
                <el-form-item label="设备地址" prop="address">
                    <el-select v-model="deviceForm.address" placeholder="请选择" style="width:180px;" :disabled="dialogMode==='add'?false:true">
                        <el-option v-for="item in 20" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属分组" prop="groupId">
                    <el-cascader :options="this.$store.getters.groups" :props="groupsProps" placeholder="请选择分组" v-model="deviceForm.groupId" style="width:180px;">
                        <template slot-scope="{ node, data }">
                        <span>{{ data.name }}</span>
                        </template>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="ip地址" prop="ipId">
                    <el-select v-model="deviceForm.ipId" placeholder="请选择" style="width:180px;" :disabled="dialogMode==='add'?false:true">
                        <el-option v-for="item in ipMap" :key="item.id" :label="item.address+':'+item.port" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备名称" prop="name">
                    <el-input v-model="deviceForm.name" type="text" style="width:180px;"></el-input>
                </el-form-item>
                <!-- <el-form-item label="设备协议">
                    <el-select v-model="deviceForm.protocolId" placeholder="请选择" style="width:180px;">
                        <el-option v-for="item in protocols" :key="item.id" :label="item.name" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="保存间隔" prop="timeInterval">
                    <el-input v-model.number="deviceForm.timeInterval" type="text" style="width:180px;"></el-input>
                </el-form-item><br>
                <el-form-item label="A相电压">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinAvol" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxAvol" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="B相电压">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinBvol" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxBvol" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="C相电压">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinCvol" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxCvol" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="A相电流">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinAcur" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxAcur" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="B相电流">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinBcur" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxBcur" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="C相电流">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinCcur" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxCcur" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="AB相电压">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinABvol" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxABvol" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="BC相电压">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinBCvol" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxBCvol" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="CA相电压">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinCAvol" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxCAvol" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="A相有功功率">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinApap" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxApap" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="B相有功功率">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinBpap" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxBpap" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="C相有功功率">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinCpap" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxCpap" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="A相无功功率">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinAprp" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxAprp" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="B相无功功率">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinBprp" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxBprp" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="C相无功功率">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinCprp" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxCprp" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="A相功率因素">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinAppf" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxAppf" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="B相功率因素">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinBppf" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxBppf" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="C相功率因素">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinCppf" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxCppf" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="总有功功率">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinTpap" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxTpap" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="总无功功率">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinTprp" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxTprp" type="text" style="width:60px;"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="总功率因素">
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMinTppf" type="text"  style="width:60px;"></el-input>
                    </el-form-item>
                    ~
                    <el-form-item style="margin-bottom:0;">
                        <el-input v-model.number="deviceForm.pemMaxTppf" type="text" style="width:60px;"></el-input>
                    </el-form-item>
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
                timeInterval:[
                    { required: true, message: '时间不能为空'},
                    { type: 'number', message: '时间必须为数字值'},
                ],
            },
        }
    }
}
</script>
<style>
    @import '~@/css/page.css';
    @import '~@/css/components/base/tab/base-dialog-group.css';
    @import '~@/css/components/base/tab/base-manage-table.css';
</style>