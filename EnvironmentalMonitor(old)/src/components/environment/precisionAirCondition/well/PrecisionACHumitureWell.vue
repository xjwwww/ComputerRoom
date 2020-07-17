<template>
    <div class="precision-humidity-well">
        <div class="precision-value-circle" ref="circle-area">
            <div class="precision-value-circle__round">
                <canvas ref="hum-canvas" class="hum-canvas" width="120" height="120">
                    
                </canvas>
            </div>
            <div class="precision-value-circle__footer">
                <div class="precision-value-circle__value" data-unit="%rh">
                    {{humidity}}
                </div>
                <div class="precision-value-circle__description">
                    湿度过低
                </div>
            </div>
        </div>
        <div class="precision-value-circle">
            <div class="precision-value-circle__round">
                <canvas ref="temp-canvas" class="temp-canvas" width="120" height="120">
                    
                </canvas>
            </div>
            <div class="precision-value-circle__footer">
                <div class="precision-value-circle__value" data-unit="°C">
                    {{temperature}}
                </div>
                <div class="precision-value-circle__description">
                    温度过低
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            req:undefined,
            tempCanvas:{
                canvas:undefined,
                context:undefined,
                rad:Math.PI*2/100,
                currentValue:0,
                circleStyle:{
                    color:'rgb(188,140,239)'
                }
            },
            humCanvas:{
                canvas:undefined,
                context:undefined,
                rad:Math.PI*2/100,
                currentValue:0,
                circleStyle:{
                    color:'rgb(134,147,243)'
                }
            },
            originCircle:{
                centerX:undefined,
                centerY:undefined,
                radius:undefined,
                width:10,
                color:'rgb(245,245,245)'
            }
        }
    },
    props:['temperature','humidity','status'],
    methods:{
        antiAliasing(canvasObj){
            let factor=2
            let width = canvasObj.canvas.width,height=canvasObj.canvas.height
            canvasObj.canvas.style.width = width + "px"
            canvasObj.canvas.style.height = height + "px"
            canvasObj.canvas.height = height * factor
            canvasObj.canvas.width = width * factor
            canvasObj.context.scale(factor, factor)
            canvasObj.context.lineCap = 'round'
        },
        originCircleDraw(canvasObj){
            canvasObj.context.lineWidth=this.originCircle.width
            canvasObj.context.strokeStyle=this.originCircle.color
            canvasObj.context.beginPath()
            canvasObj.context.arc(this.originCircle.centerX,this.originCircle.centerY,this.originCircle.radius,0,Math.PI*2,false)
            canvasObj.context.stroke()
        },
        variableCircleDraw(canvasObj){
            canvasObj.context.lineWidth=this.originCircle.width
            canvasObj.context.strokeStyle=canvasObj.circleStyle.color
            canvasObj.context.beginPath()
            canvasObj.context.arc(this.originCircle.centerX,this.originCircle.centerY,this.originCircle.radius, -Math.PI/2,-Math.PI/2 +canvasObj.rad*canvasObj.currentValue,false)
            canvasObj.context.stroke()
            canvasObj.context.closePath()
        },
        drawFrame(){
            if(this.tempCanvas.currentValue!==this.temperature||this.humCanvas.currentValue!==this.humidity){
                if(this.humCanvas.currentValue<this.humidity)
                    this.humCanvas.currentValue+=0.1
                else if(this.humCanvas.currentValue>this.humidity)
                    this.humCanvas.currentValue-=0.1

                if(this.tempCanvas.currentValue<this.temperature)
                    this.tempCanvas.currentValue+=0.1
                else if(this.tempCanvas.currentValue>this.temperature)
                    this.tempCanvas.currentValue-=0.1
                    
                this.tempCanvas.currentValue=parseFloat(this.tempCanvas.currentValue.toFixed(1))
                this.humCanvas.currentValue=parseFloat(this.humCanvas.currentValue.toFixed(1))
                
                this.originCircleDraw(this.tempCanvas)
                this.variableCircleDraw(this.tempCanvas)
                this.originCircleDraw(this.humCanvas)
                this.variableCircleDraw(this.humCanvas)
                // this.tempCircleDraw(this.currentCircleTempValue)
                // this.humCircleDraw(this.currentCircleHumValue)
                this.req=window.requestAnimationFrame(this.drawFrame)
            }else{
                console.log('cancel')
                window.cancelAnimationFrame(this.req)
                this.req=null
            }
        }
    },
    watch:{
        temperature(){
            if(!this.req)
                this.drawFrame()
        },
        humidity(){
            if(!this.req)
                this.drawFrame()
        }
    },
    mounted(){
        this.tempCanvas.canvas=this.$refs["temp-canvas"]
        this.tempCanvas.context=this.tempCanvas.canvas.getContext('2d')
        this.humCanvas.canvas=this.$refs["hum-canvas"]
        this.humCanvas.context=this.humCanvas.canvas.getContext('2d')
        
        this.tempCanvas.canvas.height=this.tempCanvas.canvas.width=
        this.humCanvas.canvas.height=this.humCanvas.canvas.width=
        this.$refs['circle-area'].getBoundingClientRect().width-10
        
        this.originCircle.centerX=this.tempCanvas.canvas.width/2
        this.originCircle.centerY=this.tempCanvas.canvas.height/2
        this.originCircle.radius=this.tempCanvas.canvas.width/2-this.originCircle.width

        this.antiAliasing(this.tempCanvas)
        this.antiAliasing(this.humCanvas)
        this.originCircleDraw(this.tempCanvas)
        this.originCircleDraw(this.humCanvas)
        this.drawFrame()
    }
}
</script>
<style>
    @import '../css/precision-ac-humiture-well.css';
</style>