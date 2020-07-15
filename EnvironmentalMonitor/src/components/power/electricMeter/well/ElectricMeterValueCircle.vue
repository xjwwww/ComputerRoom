<template>
    <div class="electric-meter-value-circle" ref="circle-area"> 
        <div class="electric-meter-value-circle__content">
            <div class="electric-meter-value-circle__value" :data-unit="canvasInfo.unit">{{param}}</div>
            <canvas ref="canvas" width="130" height="130">
                
            </canvas>
        </div>
        <div class="electric-meter-value-circle__footer">
            {{canvasInfo.name}}
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            canvas:undefined,
            context:undefined,
            currentValue:0,
            rad:undefined,
            req:undefined,
            originCircle:{
                centerX:undefined,
                centerY:undefined,
                radius:undefined,
                width:10,
                color:'#EEF5FB'
            }
        }
    },
    props:['canvasInfo','param'],
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
            this.context.arc(this.originCircle.centerX,this.originCircle.centerY,this.originCircle.radius,-Math.PI*7/6,Math.PI*1/6,false)
            this.context.stroke()
        },
        dataCircleDraw(value){
            this.context.lineWidth=this.originCircle.width
            this.context.strokeStyle=this.canvasInfo.circleStyle.color
            this.context.beginPath()
            this.context.arc(this.originCircle.centerX,this.originCircle.centerY,this.originCircle.radius, -Math.PI*7/6,-Math.PI*7/6 +this.rad*value,false)
            this.context.stroke()
            this.context.closePath()
        },
        drawFrame(){
            if(this.currentValue!==this.param){
                if(this.currentValue<this.param){
                    this.currentValue+=this.canvasInfo.step
                    if(this.currentValue>this.param)
                        this.currentValue=this.param
                }
                else if(this.currentValue>this.param){
                    this.currentValue-=this.canvasInfo.step
                    if(this.currentValue<this.param)
                        this.currentValue=this.param
                }
                
                this.currentValue=parseFloat(this.currentValue.toFixed(2))
                
                this.originCircleDraw()
                this.dataCircleDraw(this.currentValue)
                this.req=window.requestAnimationFrame(this.drawFrame)
            }else{
                window.cancelAnimationFrame(this.req)
                this.req=null
            }
        }
    },
    watch:{
        param(){
            if(!this.req)
                this.drawFrame()
        }
    },
    mounted(){
        this.canvas=this.$refs.canvas
        this.context=this.canvas.getContext('2d')
        this.canvas.width=this.$refs['circle-area'].getBoundingClientRect().height-10
        this.canvas.height=this.canvas.width-30

        this.originCircle.centerX=this.canvas.width/2
        this.originCircle.centerY=this.canvas.width/2
        this.originCircle.radius=this.canvas.width/2-this.originCircle.width

        this.rad=(Math.PI*1/6-(-Math.PI*7/6))/this.canvasInfo.maximum
        this.antiAliasing()
        this.originCircleDraw()
        this.drawFrame()
    },
}
</script>
<style>
    @import '../css/electric-meter-value-circle.css';
</style>