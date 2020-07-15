<template>
    <div class="one-data-well">
        <div class="one-data-well__content">
            <div class="one-data-well__device-info">
                <div class="one-data-well__value" 
                :class="[{'one-data-well__value_status_alarm':device.status==1,'one-data-well__value_status_unconnected':device.status==2}]" 
                :data-unit="setting.deviceUnit"
                :style="{ 'font-size': setting.dataFontSize ? setting.dataFontSize : '44px' }">
                {{device[setting.valueName]}}
                </div>
                <div class="one-data-well__name">{{device.name}}</div>
            </div>
            <canvas ref="canvas" width="210" height="210">
                
            </canvas>
        </div>
        <div class="one-data-well__footer">
            {{device.groupName}}
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            canvas:undefined,
            context:undefined,
            centerX:undefined,
            centerY:undefined,
            rad:undefined,
            req:undefined,
            currentCircleDataValue:0,
            originCircle:{
				radius:80,
				width:20,
                color:'#F5F5F5'
			},
			dataCircle:{
                color:'#248EFC',
                alarmColor:'#FF021D',
                unconnectedColor:'#666666'
			}
        }
    },
    props:['device','setting'],
    methods:{
        antiAliasing(){
            let factor=2
            let width = this.canvas.width,height=this.canvas.height
            this.canvas.style.width = width + "px"
            this.canvas.style.height = height + "px"
            this.canvas.height = height * factor
            this.canvas.width = width * factor
            this.context.scale(factor, factor)
            this.context.lineCap = 'round'
        },
        originCircleDraw(){
            this.context.lineWidth=this.originCircle.width;
            this.context.strokeStyle=this.originCircle.color
            this.context.beginPath()
            this.context.arc(this.centerX,this.centerY,this.originCircle.radius,0,Math.PI*2,false)
            this.context.stroke()
        },	
        dataCircleDraw(value){
            value-=this.setting.minimum
            this.context.lineWidth=this.originCircle.width
            if(this.device.status==0)
                this.context.strokeStyle=this.dataCircle.color
            else if(this.device.status==1)
                this.context.strokeStyle=this.dataCircle.alarmColor
            else
                this.context.strokeStyle=this.dataCircle.unconnectedColor
            this.context.beginPath()
            this.context.arc(this.centerX,this.centerY,this.originCircle.radius, -Math.PI/2,-Math.PI/2 +this.rad*value,false)
            this.context.stroke()
            this.context.closePath()
        },
        drawFrame(){
            if(this.currentCircleDataValue!==this.device[this.setting.valueName]){
                if(this.currentCircleDataValue<this.device[this.setting.valueName]){
                    this.currentCircleDataValue+=this.setting.step
                    if(this.currentCircleDataValue>this.device[this.setting.valueName])
                        this.currentCircleDataValue=this.device[this.setting.valueName]
                }
                else if(this.currentCircleDataValue>this.device[this.setting.valueName]){
                    this.currentCircleDataValue-=this.setting.step
                    if(this.currentCircleDataValue<this.device[this.setting.valueName])
                        this.currentCircleDataValue=this.device[this.setting.valueName]
                }
                this.currentCircleDataValue=parseFloat(this.currentCircleDataValue.toFixed(this.setting.digits))
                
                this.originCircleDraw()
                this.dataCircleDraw(this.currentCircleDataValue)
                this.req=window.requestAnimationFrame(this.drawFrame)
            }else{
                window.cancelAnimationFrame(this.req)
                this.req=null
            }
        }
    },
    watch:{
        // 'device.value':function(){
        //     if(!this.req)
        //         this.drawFrame()
        // },
        device:{
            handler(){
                if(!this.req)
                    this.drawFrame()
            },
            deep:true,
        }
    },
    created(){
        this.currentCircleDataValue=this.setting.minimum
        this.rad=Math.PI*2/(this.setting.maximum-this.setting.minimum)
    },
    mounted(){
        this.canvas=this.$refs.canvas
        this.context=this.canvas.getContext('2d')
        this.centerX=this.canvas.width/2
        this.centerY=this.canvas.height/2
        this.antiAliasing()
        this.originCircleDraw()
        this.drawFrame()
    },
}
</script>
<style>
    @import './one-data-well.css';
</style>