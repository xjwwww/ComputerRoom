<template>
    <!-- 8060设备 -->
    <div class="on-off-write-container">
        <div class="on-off-write-content">
            <div class="on-off-write-content__part on-off-write-content__part_left">            
                <img src="../../../header/img/Coolingfan.png" style="width:56px;height:56px">
            </div>
            <div class="on-off-write-content__part on-off-write-content__part_right">
                <div class="on-off-write-content__device-name">{{device.name}}</div>
                <div class="switch-container">			
                    <div class="switch-label"  @click="updateDeviceStatus">					
                        <div class="switch-ball" :class="{'switch-ball_active':checkboxValue}" :style="checkboxValue?style.activeBall:style.inactiveBall" data-on="开" data-off="关"></div>
                    </div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 100%;height: 100%;">
                <polygon points="0,0 141,0 171,120 0,120" class="polygon-left"  :style="checkboxValue?style.activePolygon.left:style.inactivePolygon.left"></polygon>
                <polygon points="140,0 300,0 300,120 170,120" class="polygon-right"  :style="checkboxValue?style.activePolygon.right:style.inactivePolygon.right"></polygon>
            </svg>
        </div>
        <div class="on-off-write-footer">
            {{device.groupName}}
        </div>
    </div>
</template>
<script>
import query from '@/js/query/system/OpenOrCloseFan.js'

export default {
    data(){
        return{
            checkboxValue:undefined,
            operateFlag:false,
            query:query,
            style:{
                inactivePolygon:{
                    left:{fill:"#ACC2C9"},
                    right:{fill:"#A3BBC3"}
                },
                inactiveBall:{
                    backgroundColor:"#A3BBC3"
                },
            }
        }
    },
    props:['device','setting'],
    methods:{
        updateDeviceStatus(){
            this.checkboxValue=!this.checkboxValue
            if(this.operateFlag){
                this.$message.warning("操作过于频繁，请稍后尝试")
                this.checkboxValue=!this.checkboxValue
                return
            }

            this.operateFlag=true
            let updateStatus
            if(this.checkboxValue)
                updateStatus=1
            else
                updateStatus=0
            this.query.changeDeviceStatus(this.device.deviceId,updateStatus)
            .then(({result})=>{
                if(result==='ok'){
                    this.changeDeviceStatus()
                    this.$message.success("操作成功")
                }else if(result==='error'){
                    this.$message.error("操作失败")
                    return Promise.reject()
                }else if(result==='noconnect'){
                    this.$message.error("未连接socket")
                    return Promise.reject()
                }
            })
            .catch(()=>{
                this.checkboxValue=!this.checkboxValue
                Promise.resolve()
            })
            .then(()=>
                this.operateFlag=false
            )
        },
        changeDeviceStatus(){
            if(this.device.status===0)
                this.device.status=2
            else
                this.device.status=0
        }
    },
    created(){
        //以前0代表开，1代表关，2代表报警
        if(this.device.status==1)
            this.checkboxValue=true
        else
            this.checkboxValue=false
        this.style=Object.assign(this.style,
            {
                activePolygon:{
                    left:{fill:this.setting.color.active.left},
                    right:{fill:this.setting.color.active.right}
                },
                activeBall:{
                    backgroundColor:this.setting.color.active.right
                }
            }
        )
    }
}
</script>
<style>
    @import './on-off-write-well.css';
</style>