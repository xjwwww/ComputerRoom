<template>
    <div class="two-data-well">
        <div class="two-data-well__value-circle">
            <div class="two-data-well__icon">
                <img :src="device.status===1?setting.alarmIcon:setting.icon" alt="">
            </div>
            <div :class="['two-data-well__device-name',{ 'two-data-well__device-name_status_alarm': device.status===1 }]">{{device.name}}</div>
            <canvas ref="canvas" width="200" height="200">
                
            </canvas>
        </div>
        <div class="two-data-well__data-container">
            <div class="two-data-well__data">
                <div class="two-data-well__flag" :style="{backgroundColor:circle1.color}"></div>
                <div class="two-data-well__key">{{circle1.name}}</div>
                <div :class="['two-data-well__value',{ 'two-data-well__value_status_alarm': value1Alarm }]">{{device[circle1.valueName]}}{{circle1.unit}}</div>
            </div>
            
            <div class="two-data-well__data">
                <div class="two-data-well__flag" :style="{backgroundColor:circle2.color}"></div>
                <div class="two-data-well__key">{{circle2.name}}</div>
                <div :class="['two-data-well__value',{ 'two-data-well__value_status_alarm': value2Alarm }]">{{device[circle2.valueName]}}{{circle2.unit}}</div>
            </div>
        </div>
        <div class="two-data-well__footer">
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
            req:undefined,

            originCircle:{
                radius:90,
				width:20,
				color:'rgb(214,226,246)'
			},
			circle1:{
                radius:85,
                width:10,
                rad:undefined,
                currentValue:undefined,
			},
			circle2:{
                radius:95,
                width:10,
                rad:undefined,
                currentValue:undefined,
			},
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
        circle1Draw(value){
            value-=this.circle1.minimum
            this.context.lineWidth=this.circle1.width
            this.context.strokeStyle=this.circle1.color
            this.context.beginPath()
            this.context.arc(this.centerX,this.centerY,this.circle1.radius, -Math.PI/2,-Math.PI/2 +this.circle1.rad*value,false)
            this.context.stroke()
            this.context.closePath()
        },
        circle2Draw(value){
            value-=this.circle2.minimum
            this.context.lineWidth=this.circle2.width
            this.context.strokeStyle=this.circle2.color
            this.context.beginPath()
            this.context.arc(this.centerX,this.centerY,this.circle2.radius, -Math.PI/2,-Math.PI/2 +this.circle2.rad*value,false)
            this.context.stroke()
            this.context.closePath()
        },
        drawFrame(){
            if(this.circle1.currentValue!==this.device[this.circle1.valueName]||this.circle2.currentValue!==this.device[this.circle2.valueName]){
                if(this.circle1.currentValue<this.device[this.circle1.valueName])
                    this.circle1.currentValue+=this.circle1.step
                else if(this.circle1.currentValue>this.device[this.circle1.valueName])
                    this.circle1.currentValue-=this.circle1.step

                if(this.circle2.currentValue<this.device[this.circle2.valueName])
                    this.circle2.currentValue+=this.circle2.step
                else if(this.circle2.currentValue>this.device[this.circle2.valueName])
                    this.circle2.currentValue-=this.circle2.step
                    
                this.circle1.currentValue=parseFloat(this.circle1.currentValue.toFixed(this.circle1.digits))
                this.circle2.currentValue=parseFloat(this.circle2.currentValue.toFixed(this.circle2.digits))
                
                this.originCircleDraw()
                this.circle1Draw(this.circle1.currentValue)
                this.circle2Draw(this.circle2.currentValue)
                this.req=window.requestAnimationFrame(this.drawFrame)
            }else{
                window.cancelAnimationFrame(this.req)
                this.req=null
            }
        }
    },
    watch:{
        device:{
            handler(){
                if(!this.req)
                    this.drawFrame()
            },
            deep:true,
        }
    },
    computed:{
        value1Alarm(){
            return this.device.status===1&&
            (this.device[this.circle1.valueName]>this.device[this.circle1.maxName]||this.device[this.circle1.valueName]<this.device[this.circle1.minName])
        },
        value2Alarm(){
            return this.device.status===1&&
            (this.device[this.circle2.valueName]>this.device[this.circle2.maxName]||this.device[this.circle2.valueName]<this.device[this.circle2.minName])
        }
    },
    created(){
        Object.assign(this.circle1,this.setting.circle1)
        Object.assign(this.circle2,this.setting.circle2)

        this.circle1.rad=Math.PI*2/(this.circle1.maximum-this.circle1.minimum)
        this.circle2.rad=Math.PI*2/(this.circle2.maximum-this.circle2.minimum)

        this.circle1.currentValue=this.circle1.minimum
        this.circle2.currentValue=this.circle2.minimum
    },
    mounted(){
        this.canvas=this.$refs.canvas
        this.context=this.canvas.getContext('2d')
        this.centerX=this.canvas.width/2
        this.centerY=this.canvas.height/2
        this.antiAliasing()
        this.originCircleDraw()
        this.drawFrame()
    }
}
</script>
<style>
    @import './two-data-well.css';
</style>