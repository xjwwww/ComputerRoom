<template>
    <div class="battery-value-circle" ref="circle-area">
        <div class="battery-value-circle__content">
            <div class="battery-value-circle__value" :data-unit="canvasInfo.unit">{{param}}</div>
            <div class="battery-value-circle__status" >正常</div>
            <canvas ref="canvas" width="150" height="150">
                
            </canvas>
        </div>
        <div class="battery-value-circle__footer">
            <div class="battery-value-circle__name">
                {{canvasInfo.name}}
            </div>
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
                // radius:65,
                radius:undefined,
                width:10,
                color:'#EEF5FB'
            },
            grd:undefined
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
            // this.context.strokeStyle=this.canvasInfo.circleStyle.color
            this.context.strokeStyle=this.grd
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
                
                this.currentValue=parseFloat(this.currentValue.toFixed(this.canvasInfo.digitsNumber))
                
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
        this.canvas.width=this.$refs['circle-area'].getBoundingClientRect().width-10
        this.canvas.height=this.canvas.width-30

        this.originCircle.centerX=this.canvas.width/2
        this.originCircle.centerY=this.canvas.width/2
        this.originCircle.radius=this.canvas.width/2-this.originCircle.width

        this.rad=(Math.PI*1/6-(-Math.PI*7/6))/this.canvasInfo.maximum
        this.grd=this.context.createLinearGradient(0,0,this.canvas.width,0);
        this.grd.addColorStop(0,this.canvasInfo.circleStyle.firstColor)
        this.grd.addColorStop(1,this.canvasInfo.circleStyle.lastColor)
        this.antiAliasing()
        this.originCircleDraw()
        this.drawFrame()
    },
}
</script>
<style>
    @import '../css/battery-value-circle.css';
</style>