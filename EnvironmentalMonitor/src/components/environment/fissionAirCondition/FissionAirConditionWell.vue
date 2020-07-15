<template>
    <div class="fission-ac-well">
        <div class="fission-ac-well__head">{{device.name}}</div>
        <div class="fission-ac-well__subhead">{{device.groupName}}</div>
        <div class="fission-ac-well__content">
            <div class="fission-ac-well__operate-row">
                <div class="fission-ac-well__operate-name">设备状态</div>
                <div class="fission-ac-switch" @click="changeStatus">
                    <div :class="['fission-ac-switch__ball',device.status==2?'fission-ac-switch__ball_close':'fission-ac-switch__ball_open']"></div>
                    <div :class="['fission-ac-switch__condition',{'fission-ac-switch__condition_active':device.status===2}]">关闭</div>
                    <div :class="['fission-ac-switch__condition',{'fission-ac-switch__condition_active':device.status===0}]" style="left: 50%;">开启</div>
                </div>
            </div>
            <div class="fission-ac-well__operate-row">
                <div class="fission-ac-well__operate-name">学习状态</div>
                <div class="fission-ac-switch" @click="()=>hideFlag=!hideFlag">
                    <div :class="['fission-ac-switch__ball',hideFlag===false?'fission-ac-switch__ball_close':'fission-ac-switch__ball_open']"></div>
                    <div :class="['fission-ac-switch__condition',{'fission-ac-switch__condition_active':!hideFlag}]">关闭</div>
                    <div :class="['fission-ac-switch__condition',{'fission-ac-switch__condition_active':hideFlag}]" style="left: 50%;">开启</div>
                </div>
            </div>
            <div class="fission-ac-well__button-row"  v-if="hideFlag">
                <div class="fission-ac-button">
                    <el-button size="mini" type="primary" @click="()=>transferCode(LEARN_TURN_ON_CODE)">开机</el-button>
                    <el-button size="mini" type="danger" @click="()=>transferCode(LEARN_TURN_OFF_CODE)">关机</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import query from './fissionACQuery.js'

export default {
    data(){
        return{
            LEARN_TURN_ON_CODE:1,
            LEARN_TURN_OFF_CODE:2,
            TURN_ON_CODE:3,
            TURN_OFF_CODE:4,
            hideFlag:false,
            query:query,
            operateFlag:false
        }
    },
    props:['device'],
    methods:{
        changeStatus(){
            this.reverseStatus()
            let code
            if(this.device.status==0)
                code=this.TURN_ON_CODE
            else
                code=this.TURN_OFF_CODE
            this.transferCode(code)
            .catch(()=>this.reverseStatus())
        },
        reverseStatus(){
            if(this.device.status===0)
                this.device.status=2
            else
                this.device.status=0
        },
        transferCode(code){
            if(this.operateFlag){
                this.$message.warning("操作过于频繁，请稍后尝试")
                return Promise.reject()
            }
            this.operateFlag=true
            return this.query.controlFission(this.device.deviceId,code)
            .then(({result})=>{
                if(result==='ok')
                    this.$message.success('操作成功')
                else if(result==='nosuccess'){
                    this.$message.error('操作失败')
                    return Promise.reject()    
                }else if(result==='error'){
                    this.$message.error('返回错误')
                    return Promise.reject()
                }
            })
            .then(()=>this.operateFlag=false)
            .catch(()=>{
                    this.operateFlag=false
                    return Promise.reject()
                }
            )
        },
    }
}
</script>
<style>
    @import './fission-air-condition-well.css';
</style>